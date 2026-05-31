# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Pages', type: :request do
  describe 'GET /up' do
    it 'returns http success without host authorization checks' do
      get '/up'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /' do
    it 'returns http success' do
      get root_path
      expect(response).to have_http_status(:success)
    end

    it 'renders inertia Home component' do
      get root_path
      expect(response.body).to include('Home')
    end

    context 'with artworks' do
      let!(:artwork) { create(:artwork, title: 'Test Painting') }

      it 'includes artworks data' do
        get root_path
        expect(response.body).to include('Test Painting')
      end
    end
  end

  describe 'GET /gallery' do
    it 'returns http success' do
      get gallery_path
      expect(response).to have_http_status(:success)
    end

    it 'renders inertia Gallery component' do
      get gallery_path
      expect(response.body).to include('Gallery')
    end

    context 'with artworks' do
      let!(:artwork) { create(:artwork, title: 'Gallery Piece') }

      it 'includes artworks data' do
        get gallery_path
        expect(response.body).to include('Gallery Piece')
      end
    end
  end

  describe 'GET /arena-negra' do
    it 'returns http success' do
      get arena_negra_path
      expect(response).to have_http_status(:success)
    end

    it 'renders inertia ArenaNegra component' do
      get arena_negra_path
      expect(response.body).to include('ArenaNegra')
    end

    context 'with gallery media' do
      let!(:student_work) { create(:gallery_media, :student_work, title: 'Student Art') }
      let!(:exhibition) { create(:gallery_media, :exhibition, title: 'Exhibition Piece') }

      it 'includes gallery media data' do
        get arena_negra_path
        expect(response.body).to include('Student Art')
        expect(response.body).to include('Exhibition Piece')
      end
    end

    context 'with mixed media types' do
      let!(:image_media) { create(:gallery_media, :student_work, media_type: :image, title: 'Image Work') }
      let!(:video_media) { create(:gallery_media, :workshop, :video, title: 'Video Work') }

      it 'includes both images and videos' do
        get arena_negra_path
        expect(response.body).to include('Image Work')
        expect(response.body).to include('Video Work')
      end
    end
  end
end
