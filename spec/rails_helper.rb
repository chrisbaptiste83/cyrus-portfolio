# frozen_string_literal: true

require 'spec_helper'

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'

# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?

require 'rspec/rails'

# Require support files
Rails.root.glob('spec/support/**/*.rb').sort_by(&:to_s).each { |f| require f }

# Checks for pending migrations and applies them before tests are run.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end

RSpec.configure do |config|
  # Include FactoryBot methods
  config.include FactoryBot::Syntax::Methods

  # Include Devise test helpers for request specs
  config.include Devise::Test::IntegrationHelpers, type: :request

  # Fixture paths
  config.fixture_paths = [Rails.root.join('spec/fixtures')]

  # Use transactional fixtures
  config.use_transactional_fixtures = true

  # Infer spec type from file location
  config.infer_spec_type_from_file_location!

  # Filter Rails backtrace
  config.filter_rails_from_backtrace!

  # Configure Active Storage for tests
  config.before(:each) do
    ActiveStorage::Current.url_options = { host: 'localhost', port: 3000 }
  end

  # Clean up uploaded files after tests
  config.after(:each) do
    FileUtils.rm_rf(Rails.root.join('tmp', 'storage'))
  end
end

# Shoulda Matchers configuration
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
