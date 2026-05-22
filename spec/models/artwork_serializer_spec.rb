require 'rails_helper'

RSpec.describe ArtworkSerializer do
  let(:artwork) do
    double('Artwork',
      id: 1,
      title: 'Test Art',
      year: 2024,
      medium: 'Oil on canvas',
      dimensions: '100x100 cm',
      image: double('Attachment')
    )
  end

  subject(:serializer) { described_class.new(artwork) }

  before do
    allow(serializer).to receive(:imagekit_url).and_return('https://ik.imagekit.io/test/image.jpg')
    allow(serializer).to receive(:imagekit_thumb).and_return('https://ik.imagekit.io/test/thumb.jpg')
  end

  describe '#as_json' do
    it 'serializes artwork attributes with transformed image urls' do
      json = serializer.as_json

      expect(json[:id]).to eq(1)
      expect(json[:title]).to eq('Test Art')
      expect(json[:year]).to eq(2024)
      expect(json[:medium]).to eq('Oil on canvas')
      expect(json[:dimensions]).to eq('100x100 cm')
      expect(json[:image]).to eq('https://ik.imagekit.io/test/image.jpg')
      expect(json[:thumbnail]).to eq('https://ik.imagekit.io/test/thumb.jpg')
    end
  end
end
