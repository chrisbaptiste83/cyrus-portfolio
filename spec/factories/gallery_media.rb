# frozen_string_literal: true

FactoryBot.define do
  factory :gallery_media, class: 'GalleryMedia' do
    title { Faker::Lorem.sentence(word_count: 3) }
    description { Faker::Lorem.paragraph }
    category { GalleryMedia.categories.keys.sample }
    media_type { :image }
    credit { Faker::Name.name }
    position { Faker::Number.between(from: 1, to: 100) }

    after(:build) do |media|
      if media.image?
        media.file.attach(
          io: StringIO.new(File.read(Rails.root.join('spec/fixtures/files/test_image.jpg'))),
          filename: 'test_image.jpg',
          content_type: 'image/jpeg'
        )
      else
        media.file.attach(
          io: StringIO.new(File.read(Rails.root.join('spec/fixtures/files/test_video.mp4'))),
          filename: 'test_video.mp4',
          content_type: 'video/mp4'
        )
      end
    end

    trait :student_work do
      category { :student_work }
    end

    trait :exhibition do
      category { :exhibition }
    end

    trait :workshop do
      category { :workshop }
    end

    trait :event do
      category { :event }
    end

    trait :video do
      media_type { :video }

      after(:build) do |media|
        media.file.attach(
          io: StringIO.new(File.read(Rails.root.join('spec/fixtures/files/test_video.mp4'))),
          filename: 'test_video.mp4',
          content_type: 'video/mp4'
        )
      end
    end

    trait :without_file do
      after(:build) do |media|
        media.file = nil
      end
    end
  end
end
