class DropVideos < ActiveRecord::Migration[8.0]
  def change
    drop_table :videos, if_exists: true
  end
end
