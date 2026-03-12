# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Admin', type: :request do
  let(:admin_user) { create(:admin_user) }

  before do
    sign_in admin_user
  end

  describe 'GET /admin' do
    it 'returns http success' do
      get '/admin'
      expect(response).to have_http_status(:success)
    end

    it 'renders the admin dashboard' do
      get '/admin'
      expect(response.body).to include('Dashboard')
    end
  end

  describe 'GET /arena-negra/admin' do
    it 'returns http not found' do
      get '/arena-negra/admin'
      expect(response).to have_http_status(:not_found)
    end
  end
end
