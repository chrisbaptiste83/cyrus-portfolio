class Artwork < ApplicationRecord
  has_one_attached :image, dependent: :purge_later

  validates :title, presence: true
  validates :image, presence: true

  default_scope { order(:position) }

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "dimensions", "id", "medium", "position", "title", "updated_at", "year"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["image_attachment", "image_blob"]
  end
end
