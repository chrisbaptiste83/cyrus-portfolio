class AdminUsers::SessionsController < Devise::SessionsController
  layout "admin_login"

  protected

  def after_sign_in_path_for(resource)
    admin_root_path
  end
end
