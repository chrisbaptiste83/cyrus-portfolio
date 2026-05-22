module Mux
  class Client
    def self.build
      MuxRuby.configure do |config|
        config.username = token_id
        config.password = token_secret
      end
      MuxRuby::AssetsApi.new
    end

    def self.token_id
      Rails.application.credentials.dig(:mux, :token_id) || ENV["MUX_TOKEN_ID"]
    end

    def self.token_secret
      Rails.application.credentials.dig(:mux, :token_secret) || ENV["MUX_TOKEN_SECRET"]
    end

    def self.webhook_secret
      Rails.application.credentials.dig(:mux, :webhook_secret) || ENV["MUX_WEBHOOK_SECRET"]
    end
  end
end
