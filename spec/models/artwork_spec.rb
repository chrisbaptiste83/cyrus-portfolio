# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Artwork, type: :model do
  describe 'associations' do
    it { should have_one_attached(:image) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:image) }
  end

  describe 'default scope' do
    it 'orders by position' do
      artwork3 = create(:artwork, position: 3)
      artwork1 = create(:artwork, position: 1)
      artwork2 = create(:artwork, position: 2)

      expect(Artwork.all).to eq([artwork1, artwork2, artwork3])
    end
  end

  describe '.ransackable_attributes' do
    it 'returns searchable attributes' do
      expected = %w[created_at dimensions id medium position title updated_at year]
      expect(Artwork.ransackable_attributes).to match_array(expected)
    end
  end

  describe '.ransackable_associations' do
    it 'returns searchable associations' do
      expected = %w[image_attachment image_blob]
      expect(Artwork.ransackable_associations).to match_array(expected)
    end
  end

  describe 'factory' do
    it 'creates a valid artwork' do
      artwork = build(:artwork)
      expect(artwork).to be_valid
    end

    it 'creates artwork with attached image' do
      artwork = create(:artwork)
      expect(artwork.image).to be_attached
    end

    it 'creates invalid artwork without image' do
      artwork = build(:artwork, :without_image)
      expect(artwork).not_to be_valid
      expect(artwork.errors[:image]).to include("can't be blank")
    end
  end
end
