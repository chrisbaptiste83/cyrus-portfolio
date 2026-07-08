require "rails_helper"

RSpec.describe Mux::AssetDeleter do
  let(:assets_api) { double("MuxRuby::AssetsApi", delete_asset: nil) }

  before do
    allow(Mux::Client).to receive(:build).and_return(assets_api)
  end

  describe ".call" do
    it "deletes the Mux asset" do
      expect(assets_api).to receive(:delete_asset).with("mux-asset-123")
      described_class.call("mux-asset-123")
    end

    context "when mux_asset_id is blank" do
      it "does nothing" do
        expect(assets_api).not_to receive(:delete_asset)
        described_class.call("")
      end
    end

    context "when the delete fails" do
      before do
        allow(assets_api).to receive(:delete_asset).and_raise(StandardError.new("Mux error"))
        allow(Rails.logger).to receive(:error)
      end

      it "logs the error and re-raises" do
        expect {
          described_class.call("mux-asset-123")
        }.to raise_error(StandardError, "Mux error")
        expect(Rails.logger).to have_received(:error).with("[Mux] Delete failed for asset mux-asset-123: Mux error")
      end
    end
  end
end
