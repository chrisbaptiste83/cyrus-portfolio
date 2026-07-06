class Rack::Attack
  # Throttle POST /contact by IP (5 requests per minute)
  throttle("contact/ip", limit: 5, period: 1.minute) do |request|
    if request.path == "/contact" && request.post?
      request.ip
    end
  end

  throttle("logins/ip", limit: 10, period: 5.minutes) do |req|
    req.ip if req.post? && req.path.in?(["/users/sign_in", "/admin_users/sign_in"])
  end

  throttle("logins/email", limit: 5, period: 20.minutes) do |req|
    if req.post? && req.path.in?(["/users/sign_in", "/admin_users/sign_in"])
      (req.params.dig("user", "email") || req.params.dig("admin_user", "email"))
        &.downcase&.strip
        .presence
    end
  end

  throttle("password_resets/ip", limit: 5, period: 1.hour) do |req|
    req.ip if req.post? && req.path.include?("/password")
  end

  safelist("allow-health-check") do |req|
    req.path == "/up"
  end
end
