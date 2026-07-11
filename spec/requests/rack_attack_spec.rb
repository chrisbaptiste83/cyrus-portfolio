require "rails_helper"

RSpec.describe "Rack::Attack" do
  before do
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
  end

  describe "POST /contact" do
    it "allows up to 5 requests per minute from the same IP" do
      5.times do
        post "/contact"
        expect(response).not_to have_http_status(:too_many_requests)
      end
    end

    it "throttles the 6th request from the same IP within a minute" do
      5.times { post "/contact" }

      post "/contact"
      expect(response).to have_http_status(:too_many_requests)
    end

    it "does not throttle requests from different IPs" do
      5.times do |i|
        post "/contact", env: { "REMOTE_ADDR" => "1.2.3.#{i}" }
        expect(response).not_to have_http_status(:too_many_requests)
      end
    end
  end

  describe "POST /admin_users/sign_in" do
    it "allows up to 10 attempts per minute" do
      10.times do
        post "/admin_users/sign_in"
        expect(response).not_to have_http_status(:too_many_requests)
      end
    end

    it "throttles the 11th attempt" do
      10.times { post "/admin_users/sign_in" }
      post "/admin_users/sign_in"
      expect(response).to have_http_status(:too_many_requests)
    end
  end

  describe "General IP Throttling" do
    it "allows up to 100 requests per minute" do
      100.times do
        get "/"
        expect(response).not_to have_http_status(:too_many_requests)
      end
    end

    it "throttles the 101st request" do
      100.times { get "/" }
      get "/"
      expect(response).to have_http_status(:too_many_requests)
    end

    it "does not throttle the health check endpoint /up" do
      105.times do
        get "/up"
        expect(response).not_to have_http_status(:too_many_requests)
      end
    end
  end
end
