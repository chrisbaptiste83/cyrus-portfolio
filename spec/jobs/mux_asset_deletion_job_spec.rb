require 'rails_helper'

RSpec.describe MuxAssetDeletionJob, type: :job do
  describe '#perform' do
    it 'deletes the Mux asset via MuxService' do
      expect(MuxService).to receive(:delete_asset).with('asset_123')
      described_class.perform_now('asset_123')
    end

    it 'does nothing when mux_asset_id is blank' do
      expect(MuxService).not_to receive(:delete_asset)
      described_class.perform_now(nil)
      described_class.perform_now('')
    end
  end
end
