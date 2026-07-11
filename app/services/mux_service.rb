# MuxService is a backward-compatible facade over focused Mux service objects.
# Prefer using Mux::Uploader, Mux::WebhookHandler, and Mux::AssetDeleter directly.
class MuxService
  def self.upload(media)
    Mux::Uploader.call(media)
  end

  def self.handle_webhook(payload, signature_header)
    Mux::WebhookHandler.call(payload, signature_header)
  end

  def self.delete_asset(mux_asset_id)
    Mux::AssetDeleter.call(mux_asset_id)
  end
end
