class CreateGalleryMedia < ActiveRecord::Migration[8.0]
  def change
    create_table :gallery_media do |t|
      t.string :title
      t.text :description
      t.integer :category
      t.integer :media_type
      t.string :credit
      t.integer :position

      t.timestamps
    end
  end
end
