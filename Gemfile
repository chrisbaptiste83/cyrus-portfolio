source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "propshaft"
gem "pg", "~> 1.5"
gem "puma", ">= 5.0"
gem "jsbundling-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "cssbundling-rails"
gem "jbuilder"
gem "inertia_rails"

gem "tzinfo-data", platforms: %i[ windows jruby ]

gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "bootsnap", require: false
gem "thruster", require: false

gem "image_processing", "~> 1.2"

# GCS Active Storage backend
gem "google-cloud-storage", "~> 1.53", require: false

# Mux video streaming
gem "mux_ruby"

# Admin interface
gem "devise"
gem "activeadmin"
gem "sass-embedded"

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
  gem "rspec-rails", "~> 7.0"
  gem "factory_bot_rails"
  gem "faker"
  gem "shoulda-matchers"
  gem "erb-formatter", require: false
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "simplecov", require: false
end

group :development do
  gem "web-console"
end
