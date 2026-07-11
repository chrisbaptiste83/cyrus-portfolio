class AddPositionIndexesToGalleries < ActiveRecord::Migration[8.0]
  def change
    add_index :artworks,      :position unless index_exists?(:artworks, :position)
    add_index :gallery_media, :position unless index_exists?(:gallery_media, :position)
  end
end
