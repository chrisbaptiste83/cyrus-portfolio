class ApplicationController < ActionController::Base
  include InertiaRails::Controller

  inertia_share flash: -> { flash.to_hash }

  allow_browser versions: :modern
end
