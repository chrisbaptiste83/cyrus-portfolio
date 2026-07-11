class ArtworkSerializer
  include ImagekitHelper
  include Rails.application.routes.url_helpers

  def initialize(artwork)
    @artwork = artwork
  end

  def as_json
    {
      id:         @artwork.id,
      title:      @artwork.title,
      year:       @artwork.year,
      medium:     @artwork.medium,
      dimensions: @artwork.dimensions,
      image:      image_url,
      thumbnail:  thumbnail_url
    }
  end

  private

  def image_url
    ik = imagekit_url(@artwork.image)
    return ik if ik.present?
    static_fallback
  end

  def thumbnail_url
    ik = imagekit_thumb(@artwork.image)
    return ik if ik.present?
    static_fallback
  end

  def static_fallback
    return nil unless @artwork.image.attached?
    if Rails.env.production?
      rails_blob_path(@artwork.image, only_path: true)
    else
      filename = @artwork.image.blob&.filename.to_s
      filename.present? ? "/images/#{filename}" : nil
    end
  end
end
