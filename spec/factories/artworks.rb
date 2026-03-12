# frozen_string_literal: true

FactoryBot.define do
  factory :artwork do
    title { Faker::Lorem.sentence(word_count: 3) }
    year { Faker::Number.between(from: 2000, to: 2024) }
    medium { ['Oil on canvas', 'Acrylic on wood', 'Mixed media', 'Watercolor'].sample }
    dimensions { "#{Faker::Number.between(from: 20, to: 100)} x #{Faker::Number.between(from: 20, to: 100)} cm" }
    position { Faker::Number.between(from: 1, to: 100) }

    after(:build) do |artwork|
      artwork.image.attach(
        io: StringIO.new(File.read(Rails.root.join('spec/fixtures/files/test_image.jpg'))),
        filename: 'test_image.jpg',
        content_type: 'image/jpeg'
      )
    end

    trait :without_image do
      after(:build) do |artwork|
        artwork.image = nil
      end
    end
  end
end
