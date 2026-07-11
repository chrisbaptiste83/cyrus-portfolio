require 'rails_helper'

RSpec.describe GalleryMediaSerializer do
  let(:file) { double('Attachment') }

  subject(:serializer) { described_class.new(media) }

  before do
    allow(serializer).to receive(:imagekit_url).with(file).and_return('https://ik.imagekit.io/test/file.jpg')
    allow(serializer).to receive(:imagekit_thumb).with(file).and_return('https://ik.imagekit.io/test/thumb.jpg')
    allow(serializer).to receive(:rails_blob_path).with(file, only_path: true).and_return('/rails/active_storage/blobs/test')
    allow(serializer).to receive(:rails_blob_url).with(file, host: 'localhost:3000').and_return('http://localhost:3000/rails/active_storage/blobs/test')
  end

  describe '#as_json' do
    context 'with image media' do
      let(:media) do
        double('GalleryMedia',
          id: 1,
          title: 'Opening Night',
          description: 'Gallery opening',
          category: 'exhibitions',
          media_type: 'image',
          credit: 'Photographer A',
          mux_playback_id: nil,
          mux_status: 'ready',
          video?: false,
          file: file
        )
      end

      it 'returns imagekit urls' do
        json = serializer.as_json

        expect(json[:id]).to eq(1)
        expect(json[:title]).to eq('Opening Night')
        expect(json[:file_url]).to eq('https://ik.imagekit.io/test/file.jpg')
        expect(json[:thumbnail_url]).to eq('https://ik.imagekit.io/test/thumb.jpg')
        expect(json[:mux_playback_id]).to be_nil
      end
    end

    context 'with video media that has a mux playback id' do
      let(:media) do
        double('GalleryMedia',
          id: 2,
          title: 'Workshop Recap',
          description: nil,
          category: 'workshops',
          media_type: 'video',
          credit: nil,
          mux_playback_id: 'abc123',
          mux_status: 'ready',
          video?: true,
          file: file
        )
      end

      it 'returns the mux stream and thumbnail urls' do
        json = serializer.as_json

        expect(json[:file_url]).to eq('https://stream.mux.com/abc123.m3u8')
        expect(json[:thumbnail_url]).to eq('https://image.mux.com/abc123/thumbnail.jpg?width=800')
      end
    end

    context 'with video media missing a mux playback id' do
      let(:media) do
        double('GalleryMedia',
          id: 3,
          title: 'Pending Video',
          description: nil,
          category: 'events',
          media_type: 'video',
          credit: nil,
          mux_playback_id: nil,
          mux_status: 'preparing',
          video?: true,
          image?: false,
          file: file
        )
      end

      before do
        allow(file).to receive(:attached?).and_return(true)
      end

      it 'returns nil for the thumbnail' do
        json = serializer.as_json

        expect(json[:file_url]).to eq('http://localhost:3000/rails/active_storage/blobs/test')
        expect(json[:thumbnail_url]).to be_nil
      end
    end
  end
end
