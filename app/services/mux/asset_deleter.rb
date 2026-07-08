module Mux
  class AssetDeleter
    def self.call(mux_asset_id)
      new(mux_asset_id).call
    end

    def initialize(mux_asset_id)
      @mux_asset_id = mux_asset_id
    end

    def call
      return if @mux_asset_id.blank?
      Mux::Client.build.delete_asset(@mux_asset_id)
    rescue => e
      # Log then re-raise -- MuxAssetDeletionJob has no rescue of its own,
      # so swallowing this meant a failed delete just vanished: no retry,
      # no visibility, and the asset stays live (and billable) on Mux
      # forever with no local record pointing at it.
      Rails.logger.error "[Mux] Delete failed for asset #{@mux_asset_id}: #{e.message}"
      raise
    end
  end
end
