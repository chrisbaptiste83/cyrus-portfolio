class Rack::Attack
  # Throttle POST /contact by IP (5 requests per minute)
  throttle("contact/ip", limit: 5, period: 1.minute) do |request|
    if request.path == "/contact" && request.post?
      request.ip
    end
  end
end
