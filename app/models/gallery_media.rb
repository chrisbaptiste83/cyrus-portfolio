class GalleryMedia < ApplicationRecord
  self.table_name = "gallery_media"

  has_one_attached :file, dependent: :purge_later

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

  after_commit :enqueue_mux_upload, on: [ :create, :update ], if: :should_upload_to_mux?
  after_commit :enqueue_mux_cleanup, on: :destroy, if: -> { mux_asset_id.present? }

  def mux_ready?
    mux_playback_id.present? && mux_status == "ready"
  end

  def mux_thumbnail_url(width: 800, time: 2)
    return nil unless mux_ready?
    "https://image.mux.com/#{mux_playback_id}/thumbnail.jpg?width=#{width}&fit_mode=preserve&time=#{time}"
  end

  def mux_stream_url
    return nil unless mux_ready?
    "https://stream.mux.com/#{mux_playback_id}.m3u8"
  end

  def self.ransackable_attributes(auth_object = nil)
    ["category", "created_at", "credit", "description", "id", "media_type", "mux_asset_id", "mux_playback_id", "mux_status", "position", "title", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["file_attachment", "file_blob"]
  end

  def reset_and_requeue_mux!
    update_columns(mux_asset_id: nil, mux_playback_id: nil, mux_status: nil)
    MuxUploadJob.perform_later(id)
  end

  private

  def should_upload_to_mux?
    video? && file.attached? && (file.blob.previously_new_record? || mux_asset_id.blank?)
  end

  def enqueue_mux_upload
    MuxUploadJob.perform_later(id)
  end

  def enqueue_mux_cleanup
    MuxAssetDeletionJob.perform_later(mux_asset_id)
  end
end
