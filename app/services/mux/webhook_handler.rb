module Mux
  class WebhookVerificationError < StandardError; end

  class WebhookVerifier
    def self.verify!(payload, signature_header, secret)
      raise WebhookVerificationError, "MUX_WEBHOOK_SECRET is not configured" if secret.blank?
      raise WebhookVerificationError, "MuxRuby::Webhooks is not available" unless defined?(MuxRuby::Webhooks)

      MuxRuby::Webhooks.verify_header(payload, signature_header, secret)
    rescue StandardError => e
      raise WebhookVerificationError, e.message
    end
  end

  class WebhookHandler
    def self.call(payload, signature_header)
      new(payload, signature_header).call
    end

    def initialize(payload, signature_header)
      @payload = payload
      @signature_header = signature_header
    end

    def call
      verify_signature!

      Rails.logger.info "[Mux] Webhook: #{type} for asset #{data[:id]}"

      ActiveRecord::Base.transaction do
        media = GalleryMedia.lock.find_by(mux_asset_id: data[:id])
        return false unless media

        case type
        when "video.asset.ready"
          handle_ready(media)
        when "video.asset.errored"
          handle_error(media)
        when "video.asset.deleted"
          handle_deleted(media)
        end
      end

      true
    rescue Mux::WebhookVerificationError
      Rails.logger.warn "[Mux] Invalid webhook signature"
      false
    end

    private

    def verify_signature!
      Mux::WebhookVerifier.verify!(@payload, @signature_header, Mux::Client.webhook_secret)
    end

    def event
      @event ||= JSON.parse(@payload, symbolize_names: true)
    end

    def type
      event[:type]
    end

    def data
      event[:data]
    end

    def handle_ready(media)
      playback_id = data.dig(:playback_ids, 0, :id)
      media.update_columns(
        mux_playback_id: playback_id,
        mux_status: "ready"
      )
    end

    def handle_error(media)
      media.update_columns(mux_status: "error")
      Rails.logger.error "[Mux] Asset error for GalleryMedia##{media.id}: #{data[:errors]}"
    end

    def handle_deleted(media)
      media.update_columns(
        mux_asset_id: nil,
        mux_playback_id: nil,
        mux_status: "pending"
      )
    end
  end
end
