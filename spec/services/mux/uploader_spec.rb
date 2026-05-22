require "rails_helper"

RSpec.describe Mux::Uploader do
  let(:file) { instance_double(ActiveStorage::Attached::One, attached?: true) }
  let(:media) do
    instance_double(
      GalleryMedia,
      id: 42,
      video?: true,
      file: file,
      mux_asset_id: nil,
      update_columns: true
    )
  end

  let(:assets_api) { double("MuxRuby::AssetsApi", create_asset: asset_response) }
  let(:asset_response) { double("asset_response", data: asset_data) }
  let(:asset_data) { double("asset_data", id: "mux-asset-123") }

  before do
    allow(Mux::Client).to receive(:build).and_return(assets_api)
    allow(Rails.application.routes.url_helpers).to receive(:rails_blob_url).and_return("https://example.com/video.mp4")
  end

  describe ".call" do
    it "uploads the video to Mux and updates the media record" do
      expect(assets_api).to receive(:create_asset).with(
        an_instance_of(MuxRuby::CreateAssetRequest)
      ).and_return(asset_response)

      expect(media).to receive(:update_columns).with(
        mux_asset_id: "mux-asset-123",
        mux_status: "processing"
      )

      result = described_class.call(media)
      expect(result).to eq("mux-asset-123")
    end

    context "when media is not a video" do
      let(:media) do
        instance_double(GalleryMedia, video?: false, file: file, mux_asset_id: nil)
      end

      it "returns nil" do
        expect(described_class.call(media)).to be_nil
      end
    end

    context "when file is not attached" do
      let(:file) { instance_double(ActiveStorage::Attached::One, attached?: false) }

      it "returns nil" do
        expect(described_class.call(media)).to be_nil
      end
    end

    context "when mux_asset_id is already present" do
      let(:media) do
        instance_double(
          GalleryMedia,
          id: 42,
          video?: true,
          file: file,
          mux_asset_id: "existing",
          update_columns: true
        )
      end

      it "returns nil" do
        expect(described_class.call(media)).to be_nil
      end
    end

    context "when the upload fails" do
      before do
        allow(assets_api).to receive(:create_asset).and_raise(StandardError.new("Mux error"))
        allow(Rails.logger).to receive(:error)
      end

      it "logs the error and returns nil" do
        expect(described_class.call(media)).to be_nil
        expect(Rails.logger).to have_received(:error).with("[Mux] Upload failed for GalleryMedia#42: Mux error")
      end
    end
  end
end
