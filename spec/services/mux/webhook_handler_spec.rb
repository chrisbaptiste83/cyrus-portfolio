require "rails_helper"

RSpec.describe Mux::WebhookHandler do
  let(:payload) { { type: type, data: data }.to_json }
  let(:signature_header) { "valid-signature" }
  let(:data) { { id: "mux-asset-123", playback_ids: [{ id: "playback-123" }] } }

  let(:media) do
    instance_double(GalleryMedia, id: 42, update_columns: true)
  end

  before do
    allow(GalleryMedia).to receive(:find_by).with(mux_asset_id: "mux-asset-123").and_return(media)
    allow(Mux::Client).to receive(:webhook_secret).and_return("secret")
    allow(Mux::WebhookVerifier).to receive(:verify!)
    allow(Rails.logger).to receive(:info)
    allow(Rails.logger).to receive(:error)
    allow(Rails.logger).to receive(:warn)
  end

  describe ".call" do
    context "with video.asset.ready" do
      let(:type) { "video.asset.ready" }

      it "updates the media with playback_id and ready status" do
        expect(media).to receive(:update_columns).with(
          mux_playback_id: "playback-123",
          mux_status: "ready"
        )

        expect(described_class.call(payload, signature_header)).to be true
      end
    end

    context "with video.asset.errored" do
      let(:type) { "video.asset.errored" }
      let(:data) { { id: "mux-asset-123", errors: { message: "fail" } } }

      it "updates the media with error status" do
        expect(media).to receive(:update_columns).with(mux_status: "error")
        expect(described_class.call(payload, signature_header)).to be true
      end
    end

    context "with video.asset.deleted" do
      let(:type) { "video.asset.deleted" }

      it "clears mux fields" do
        expect(media).to receive(:update_columns).with(
          mux_asset_id: nil,
          mux_playback_id: nil,
          mux_status: "pending"
        )

        expect(described_class.call(payload, signature_header)).to be true
      end
    end

    context "when media is not found" do
      let(:type) { "video.asset.ready" }

      before do
        allow(GalleryMedia).to receive(:find_by).with(mux_asset_id: "mux-asset-123").and_return(nil)
      end

      it "returns false" do
        expect(described_class.call(payload, signature_header)).to be false
      end
    end

    context "when signature is invalid" do
      let(:type) { "video.asset.ready" }

      before do
        allow(Mux::WebhookVerifier).to receive(:verify!).and_raise(Mux::WebhookVerificationError)
      end

      it "returns false" do
        expect(described_class.call(payload, signature_header)).to be false
      end
    end

    context "when webhook secret is blank" do
      let(:type) { "video.asset.ready" }

      before do
        allow(Mux::Client).to receive(:webhook_secret).and_return(nil)
      end

      it "skips verification and processes the event" do
        expect(Mux::WebhookVerifier).not_to receive(:verify!)
        expect(media).to receive(:update_columns)
        expect(described_class.call(payload, signature_header)).to be true
      end
    end
  end
end
