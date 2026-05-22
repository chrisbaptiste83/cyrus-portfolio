require 'rails_helper'

RSpec.describe Artist, type: :model do
  describe '.to_h' do
    it 'returns the full artist data hash' do
      expect(Artist.to_h).to be_a(Hash)
      expect(Artist.to_h[:name]).to eq('Cyrus Baptiste')
    end
  end

  describe '.[]' do
    it 'returns a specific data key' do
      expect(Artist[:name]).to eq('Cyrus Baptiste')
      expect(Artist[:instagram_gallery]).to eq('https://www.instagram.com/arenanegragaleria')
    end
  end
end
