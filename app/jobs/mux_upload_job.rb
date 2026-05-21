class MuxUploadJob < ApplicationJob
  queue_as :default

  def perform(gallery_media_id)
    media = GalleryMedia.find_by(id: gallery_media_id)
    return unless media&.file&.attached?
    return unless media.video?

    MuxService.upload(media)
  rescue => e
    Rails.logger.error("MuxUploadJob failed for GalleryMedia##{gallery_media_id}: #{e.message}")
    media&.update_columns(mux_status: "errored")
    raise
  end
end
