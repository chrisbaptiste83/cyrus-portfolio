# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GalleryMedia, type: :model do
  describe 'associations' do
    it { should have_one_attached(:file) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:file) }
    it { should validate_presence_of(:category) }
    it { should validate_presence_of(:media_type) }
  end

  describe 'enums' do
    it 'defines category enum' do
      expect(GalleryMedia.categories).to eq({
        'student_work' => 0,
        'exhibition' => 1,
        'event' => 2,
        'workshop' => 3
      })
    end

    it 'defines media_type enum' do
      expect(GalleryMedia.media_types).to eq({
        'image' => 0,
        'video' => 1
      })
    end
  end

  describe 'scopes' do
    before do
      @student_image = create(:gallery_media, :student_work, media_type: :image)
      @exhibition_video = create(:gallery_media, :exhibition, :video)
      @workshop_image = create(:gallery_media, :workshop, media_type: :image)
    end

    describe '.by_category' do
      it 'filters by category' do
        expect(GalleryMedia.by_category(:student_work)).to include(@student_image)
        expect(GalleryMedia.by_category(:student_work)).not_to include(@exhibition_video)
      end
    end

    describe '.images' do
      it 'returns only images' do
        expect(GalleryMedia.images).to include(@student_image, @workshop_image)
        expect(GalleryMedia.images).not_to include(@exhibition_video)
      end
    end

    describe '.videos' do
      it 'returns only videos' do
        expect(GalleryMedia.videos).to include(@exhibition_video)
        expect(GalleryMedia.videos).not_to include(@student_image)
      end
    end
  end

  describe 'default scope' do
    it 'orders by position' do
      media3 = create(:gallery_media, position: 3)
      media1 = create(:gallery_media, position: 1)
      media2 = create(:gallery_media, position: 2)

      expect(GalleryMedia.unscoped.reorder(position: :asc).pluck(:id)).to eq([media1.id, media2.id, media3.id])
    end
  end

  describe '.ransackable_attributes' do
    it 'returns searchable attributes' do
      expected = %w[category created_at credit description id media_type position title updated_at]
      expect(GalleryMedia.ransackable_attributes).to match_array(expected)
    end
  end

  describe 'factory' do
    it 'creates a valid gallery media' do
      media = build(:gallery_media)
      expect(media).to be_valid
    end

    it 'creates gallery media with attached file' do
      media = create(:gallery_media)
      expect(media.file).to be_attached
    end

    it 'creates video with video file' do
      media = create(:gallery_media, :video)
      expect(media).to be_video
      expect(media.file).to be_attached
    end

    it 'creates invalid gallery media without file' do
      media = build(:gallery_media, :without_file)
      expect(media).not_to be_valid
      expect(media.errors[:file]).to include("can't be blank")
    end
  end

  describe 'category traits' do
    it 'creates student work' do
      media = create(:gallery_media, :student_work)
      expect(media).to be_student_work
    end

    it 'creates exhibition' do
      media = create(:gallery_media, :exhibition)
      expect(media).to be_exhibition
    end

    it 'creates workshop' do
      media = create(:gallery_media, :workshop)
      expect(media).to be_workshop
    end

    it 'creates event' do
      media = create(:gallery_media, :event)
      expect(media).to be_event
    end
  end
end
