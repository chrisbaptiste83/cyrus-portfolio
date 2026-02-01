# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile Active Admin assets
Rails.application.config.assets.precompile += %w[active_admin.css active_admin.js]

# Exclude builds folder from Sprockets (handled by Propshaft/cssbundling)
Rails.application.config.assets.paths.reject! { |p| p.to_s.include?("builds") } if Rails.application.config.assets.paths.respond_to?(:reject!)
