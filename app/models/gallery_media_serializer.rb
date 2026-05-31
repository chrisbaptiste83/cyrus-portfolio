class GalleryMediaSerializer
  include Rails.application.routes.url_helpers
  include ImagekitHelper

  def initialize(media)
    @media = media
  end

  def as_json
    {
      id:              @media.id,
      title:           @media.title,
      description:     @media.description,
      category:        @media.category,
      media_type:      @media.media_type,
      credit:          @media.credit,
      file_url:        file_url,
      thumbnail_url:   thumbnail_url,
      mux_playback_id: @media.mux_playback_id,
      mux_status:      @media.mux_status
    }
  end

  private

  def file_url
    return @media.imagekit_url if @media.respond_to?(:imagekit_url) && @media.imagekit_url.present?

    if @media.video?
      return "https://stream.mux.com/#{@media.mux_playback_id}.m3u8" if @media.mux_playback_id.present?
      return nil unless @media.file.attached?

      host = Rails.application.routes.default_url_options[:host] || "localhost:3000"
      rails_blob_url(@media.file, host: host)
    else
      imagekit_url(@media.file)
    end
  end

  def thumbnail_url
    if @media.respond_to?(:imagekit_url) && @media.imagekit_url.present?
      return @media.image? ? "#{@media.imagekit_url}?tr=w-800,h-800,fo-auto" : @media.imagekit_url
    end

    if @media.video?
      if @media.mux_playback_id.present?
        "https://image.mux.com/#{@media.mux_playback_id}/thumbnail.jpg?width=800"
      end
    else
      imagekit_thumb(@media.file)
    end
  end
end
