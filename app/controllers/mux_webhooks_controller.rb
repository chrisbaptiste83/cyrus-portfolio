class MuxWebhooksController < ApplicationController
  # Skip CSRF — Mux sends raw POST
  skip_before_action :verify_authenticity_token

  def receive
    payload   = request.raw_post
    signature = request.headers["Mux-Signature"]

    if MuxService.handle_webhook(payload, signature)
      head :ok
    else
      head :unprocessable_entity
    end
  end
end
