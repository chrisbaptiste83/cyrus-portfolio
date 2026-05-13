class AddMuxFieldsToGalleryMedia < ActiveRecord::Migration[8.0]
  def change
    add_column :gallery_media, :mux_asset_id, :string
    add_column :gallery_media, :mux_playback_id, :string
    add_column :gallery_media, :mux_status, :string
  end
end
