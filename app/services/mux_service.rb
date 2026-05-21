require "mux_ruby"

# MuxService handles all interaction with the Mux video API.
#
# Setup (add to Rails credentials):
#   mux:
#     token_id:     your_mux_token_id
#     token_secret: your_mux_token_secret
#     webhook_secret: your_mux_webhook_secret  # from Mux dashboard
#
# Or via ENV:
#   MUX_TOKEN_ID, MUX_TOKEN_SECRET, MUX_WEBHOOK_SECRET
#
# Flow:
#   1. Admin uploads a video file via ActiveAdmin → GCS via Active Storage
#   2. After save, MuxService.upload(gallery_media) is called (via after_commit)
#   3. Mux fetches the file from GCS, transcodes it, fires a webhook when ready
#   4. Webhook hits /mux/webhook → MuxService.handle_webhook updates the record
#   5. Frontend uses mux_playback_id to stream HLS + show thumbnail

class MuxService
  MUX_TOKEN_ID     = Rails.application.credentials.dig(:mux, :token_id)     || ENV["MUX_TOKEN_ID"]
  MUX_TOKEN_SECRET = Rails.application.credentials.dig(:mux, :token_secret) || ENV["MUX_TOKEN_SECRET"]
  WEBHOOK_SECRET   = Rails.application.credentials.dig(:mux, :webhook_secret) || ENV["MUX_WEBHOOK_SECRET"]

  # Upload a GalleryMedia video to Mux via its GCS public URL
  def self.upload(media)
    return unless media.video? && media.file.attached?
    return if media.mux_asset_id.present?

    # Get a signed or public GCS URL for Mux to pull from
    file_url = Rails.application.routes.url_helpers.rails_blob_url(
      media.file,
      host: Rails.application.credentials.dig(:app, :host) || ENV.fetch("APP_HOST", "https://cyrusbaptiste.com")
    )

    client = build_client
    asset = client.create_asset(
      MuxRuby::CreateAssetRequest.new(
        input:       [ MuxRuby::InputSettings.new(url: file_url) ],
        playback_policy: [ MuxRuby::PlaybackPolicy::PUBLIC ],
        mp4_support: "standard"  # enables MP4 download fallback
      )
    )

    media.update_columns(
      mux_asset_id: asset.data.id,
      mux_status:   "processing"
    )

    asset.data.id
  rescue => e
    Rails.logger.error "[Mux] Upload failed for GalleryMedia##{media.id}: #{e.message}"
    nil
  end

  # Process incoming Mux webhook payload
  # Returns true if handled, false if ignored or invalid
  def self.handle_webhook(payload, signature_header)
    # Verify webhook signature (optional but recommended)
    if WEBHOOK_SECRET.present?
      begin
        MuxRuby::Webhooks.verify_header(payload, signature_header, WEBHOOK_SECRET)
      rescue MuxRuby::WebhookVerificationError
        Rails.logger.warn "[Mux] Invalid webhook signature"
        return false
      end
    end

    event = JSON.parse(payload, symbolize_names: true)
    type  = event[:type]
    data  = event[:data]

    Rails.logger.info "[Mux] Webhook: #{type} for asset #{data[:id]}"

    media = GalleryMedia.find_by(mux_asset_id: data[:id])
    return false unless media

    case type
    when "video.asset.ready"
      playback_id = data.dig(:playback_ids, 0, :id)
      media.update_columns(
        mux_playback_id: playback_id,
        mux_status:      "ready"
      )
    when "video.asset.errored"
      media.update_columns(mux_status: "error")
      Rails.logger.error "[Mux] Asset error for GalleryMedia##{media.id}: #{data[:errors]}"
    when "video.asset.deleted"
      media.update_columns(
        mux_asset_id:    nil,
        mux_playback_id: nil,
        mux_status:      "pending"
      )
    end

    true
  end

  # Delete a Mux asset (call from before_destroy or admin action)
  def self.delete_asset(mux_asset_id)
    return if mux_asset_id.blank?
    build_client.delete_asset(mux_asset_id)
  rescue => e
    Rails.logger.error "[Mux] Delete failed for asset #{mux_asset_id}: #{e.message}"
  end

  private

  def self.build_client
    MuxRuby.configure do |config|
      config.username = MUX_TOKEN_ID
      config.password = MUX_TOKEN_SECRET
    end
    MuxRuby::AssetsApi.new
  end
end
