InertiaRails.configure do |config|
  # Version can be a lambda that will be called on each request
  config.version = "1.0"

  # Include empty errors hash to comply with Inertia protocol
  config.always_include_errors_hash = true
end
