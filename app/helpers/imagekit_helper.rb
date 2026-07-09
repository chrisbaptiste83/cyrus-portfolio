module ImagekitHelper
  IMAGEKIT_ENDPOINT = Rails.application.credentials.dig(:imagekit, :endpoint) ||
                      ENV.fetch("IMAGEKIT_ENDPOINT", nil)

  def imagekit_url(attachment, **transforms)
    return nil if attachment.nil?

    key = if attachment.is_a?(String)
            attachment
          elsif attachment.respond_to?(:blob)
            attachment.blob&.key
          elsif attachment.respond_to?(:key)
            attachment.key
          end

    return nil if key.blank?

    if IMAGEKIT_ENDPOINT.blank? || ENV["DISABLE_IMAGEKIT"] == "true"
      # Development fallback: serve directly via Active Storage
      return attachment.respond_to?(:blob) ? url_for(attachment) : nil rescue nil
    end

    tr = build_transform(transforms)
    tr_segment = tr.present? ? "/tr:#{tr}" : ""
    "#{IMAGEKIT_ENDPOINT}#{tr_segment}/#{key}"
  end

  def imagekit_avatar(attachment, size: :md)
    px = { xs: 32, sm: 40, md: 56, lg: 80, xl: 128 }.fetch(size, 56)
    return nil unless attachment&.attached?
    imagekit_url(attachment, w: px, h: px, c: "maintain_ratio", fo: "face", f: "auto", q: 80)
  end

  def imagekit_thumb(attachment, size: 400)
    return nil unless attachment&.attached?
    imagekit_url(attachment, w: size, h: size, c: "maintain_ratio", f: "auto", q: 80)
  end

  def imagekit_post_image(attachment, width: 800)
    return nil unless attachment&.attached?
    imagekit_url(attachment, w: width, c: "at_max", f: "auto", q: 85)
  end

  def imagekit_full(attachment)
    return nil unless attachment&.attached?
    imagekit_url(attachment, f: "auto", q: 90)
  end

  def imagekit_srcset(attachment, widths = [ 400, 800, 1200 ])
    return nil unless attachment&.attached?
    widths.map { |w| "#{imagekit_url(attachment, w: w, f: "auto", q: 85)} #{w}w" }.join(", ")
  end

  private

  def build_transform(opts)
    return "" if opts.empty?

    mapping = {
      w: "w", h: "h", c: "c", fo: "fo",
      f: "f", q: "q", r: "r", bl: "bl", e: "e",
      ar: "ar", b: "b", bg: "bg", bo: "bo",
      dpr: "dpr", lo: "lo", t: "t"
    }

    opts.filter_map do |key, value|
      ik_key = mapping[key]
      next if ik_key.nil? || value.nil?
      "#{ik_key}-#{value}"
    end.join(",")
  end
end
