module Mux
  class Uploader
    def self.call(media)
      new(media).call
    end

    def initialize(media)
      @media = media
    end

    def call
      return unless @media.video? && @media.file.attached?
      return if @media.mux_asset_id.present?

      asset = client.create_asset(
        MuxRuby::CreateAssetRequest.new(
          input: [MuxRuby::InputSettings.new(url: file_url)],
          playback_policy: [MuxRuby::PlaybackPolicy::PUBLIC],
          mp4_support: "standard"
        )
      )

      @media.update_columns(
        mux_asset_id: asset.data.id,
        mux_status: "processing"
      )

      asset.data.id
    rescue => e
      # Log then re-raise: swallowing this here meant MuxUploadJob's own
      # rescue (which marks the media errored) never fired, and Solid Queue
      # never saw a failure to surface or retry -- uploads that failed just
      # silently left the record stuck with no operator visibility.
      Rails.logger.error "[Mux] Upload failed for GalleryMedia##{@media.id}: #{e.message}"
      raise
    end

    private

    def client
      @client ||= Mux::Client.build
    end

    def file_url
      Rails.application.routes.url_helpers.rails_blob_url(
        @media.file,
        host: Rails.application.credentials.dig(:app, :host) || ENV.fetch("APP_HOST", "https://cyrusbaptiste.com")
      )
    end
  end
end
