class CreateArtworks < ActiveRecord::Migration[8.0]
  def change
    create_table :artworks do |t|
      t.string :title
      t.string :year
      t.text :medium
      t.string :dimensions
      t.integer :position

      t.timestamps
    end
  end
end
