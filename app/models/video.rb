class Video < ApplicationRecord
  has_one_attached :file

  validates :title, presence: true
  validates :file, presence: true

  default_scope { order(:position) }

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "position", "title", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["file_attachment", "file_blob"]
  end
end
