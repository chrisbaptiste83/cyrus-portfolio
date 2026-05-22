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
      Rails.logger.error "[Mux] Delete failed for asset #{@mux_asset_id}: #{e.message}"
    end
  end
end
