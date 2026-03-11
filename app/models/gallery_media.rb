class GalleryMedia < ApplicationRecord
  self.table_name = "gallery_media"

  has_one_attached :file

  enum :category, {
    student_work: 0,
    exhibition: 1,
    event: 2,
    workshop: 3
  }

  enum :media_type, {
    image: 0,
    video: 1
  }

  validates :title, presence: true
  validates :file, presence: true
  validates :category, presence: true
  validates :media_type, presence: true

  default_scope { order(:position) }

  scope :by_category, ->(cat) { where(category: cat) }
  scope :images, -> { where(media_type: :image) }
  scope :videos, -> { where(media_type: :video) }

  def self.ransackable_attributes(auth_object = nil)
    ["category", "created_at", "credit", "description", "id", "media_type", "position", "title", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["file_attachment", "file_blob"]
  end
end
