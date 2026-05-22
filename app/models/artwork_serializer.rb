class ArtworkSerializer
  include ImagekitHelper

  def initialize(artwork)
    @artwork = artwork
  end

  def as_json
    {
      id: @artwork.id,
      title: @artwork.title,
      year: @artwork.year,
      medium: @artwork.medium,
      dimensions: @artwork.dimensions,
      image: imagekit_url(@artwork.image),
      thumbnail: imagekit_thumb(@artwork.image)
    }
  end
end
