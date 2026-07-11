class AddIndexesToGalleryMedia < ActiveRecord::Migration[8.0]
  def change
    add_index :gallery_media, :category
    add_index :gallery_media, :media_type
  end
end
