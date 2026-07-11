class MuxAssetDeletionJob < ApplicationJob
  def perform(mux_asset_id)
    MuxService.delete_asset(mux_asset_id) if mux_asset_id.present?
  end
end
