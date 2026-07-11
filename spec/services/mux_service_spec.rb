require "rails_helper"

RSpec.describe MuxService do
  describe ".upload" do
    it "delegates to Mux::Uploader" do
      media = double("media")
      expect(Mux::Uploader).to receive(:call).with(media)
      described_class.upload(media)
    end
  end

  describe ".handle_webhook" do
    it "delegates to Mux::WebhookHandler" do
      expect(Mux::WebhookHandler).to receive(:call).with("payload", "sig")
      described_class.handle_webhook("payload", "sig")
    end
  end

  describe ".delete_asset" do
    it "delegates to Mux::AssetDeleter" do
      expect(Mux::AssetDeleter).to receive(:call).with("asset-id")
      described_class.delete_asset("asset-id")
    end
  end
end
