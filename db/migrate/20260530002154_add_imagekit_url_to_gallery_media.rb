class AddImagekitUrlToGalleryMedia < ActiveRecord::Migration[8.0]
  IMAGE_URLS = [
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-01.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-08.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-16-11-04-08.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-39-51_1.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-39-51.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-39-57.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-00.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-00_1.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-01_2.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-00_2.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-04.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-39-57_1.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-01_1.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-39-51_2.jpg",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery/PHOTO-2026-03-05-22-40-08_1.jpg",
  ].freeze

  VIDEO_URLS = [
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery%20Video%201",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery%20Video%202",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery%20Video%203",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery%20Video%204",
    "https://ik.imagekit.io/ja0efuulc/Arena%20Negra%20Gallery%20Video%205",
  ].freeze

  def up
    add_column :gallery_media, :imagekit_url, :string unless column_exists?(:gallery_media, :imagekit_url)

    # Populate by category + position order — only rows that don't already have a URL
    execute("SELECT id FROM gallery_media WHERE category = 0 ORDER BY position ASC").to_a
      .each_with_index { |row, i| execute("UPDATE gallery_media SET imagekit_url = '#{IMAGE_URLS[i]}' WHERE id = #{row['id']} AND imagekit_url IS NULL") if IMAGE_URLS[i] }

    execute("SELECT id FROM gallery_media WHERE category = 2 ORDER BY position ASC").to_a
      .each_with_index { |row, i| execute("UPDATE gallery_media SET imagekit_url = '#{VIDEO_URLS[i]}' WHERE id = #{row['id']} AND imagekit_url IS NULL") if VIDEO_URLS[i] }
  end

  def down
    remove_column :gallery_media, :imagekit_url
  end
end
