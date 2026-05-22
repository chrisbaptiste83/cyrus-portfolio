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
    @media.video? ? rails_blob_path(@media.file, only_path: true) : imagekit_url(@media.file)
  end

  def thumbnail_url
    if @media.video?
      @media.mux_playback_id.present? ? "https://image.mux.com/#{@media.mux_playback_id}/thumbnail.jpg?width=800" : nil
    else
      imagekit_thumb(@media.file)
    end
  end
end
