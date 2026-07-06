class PagesController < ApplicationController
  def home
    render inertia: "Home", props: {
      artist: Artist.to_h,
      artworks: artworks_data
    }
  end

  def gallery
    render inertia: "Gallery", props: {
      artworks: artworks_data
    }
  end

  def artwork
    record = Artwork.find_by(id: params[:id])
    return redirect_to gallery_path unless record

    all = Artwork.all.to_a
    idx = all.index(record)

    render inertia: "ArtworkShow", props: {
      artwork: ArtworkSerializer.new(record).as_json,
      prev_id: idx > 0 ? all[idx - 1].id : nil,
      next_id: idx < all.length - 1 ? all[idx + 1].id : nil
    }
  end

  def arena_negra
    render inertia: "ArenaNegra", props: {
      artworks: artworks_data,
      gallery_media: gallery_media_data,
      gallery_info: Artist[:gallery_info],
      instagram_gallery: Artist[:instagram_gallery]
    }
  end

  def bio
    render inertia: "Bio", props: { artist: Artist.to_h }
  end

  def contact
    render inertia: "Contact", props: {}
  end

  def send_message
    name    = params[:name]&.strip
    email   = params[:email]&.strip
    message = params[:message]&.strip

    if [ name, email, message ].all?(&:present?) && email.match?(URI::MailTo::EMAIL_REGEXP)
      ContactMailer.message(name: name, email: email, body: message).deliver_later
      redirect_to contact_path, notice: "¡Gracias! Tu mensaje ha sido enviado. Te responderé pronto."
    else
      redirect_to contact_path, alert: "Por favor completa todos los campos con información válida."
    end
  end

  private

  def artworks_data
    Artwork.all.map { |artwork| ArtworkSerializer.new(artwork).as_json }
  end

  def gallery_media_data
    {
      student_work: GalleryMedia.student_work.map { |m| GalleryMediaSerializer.new(m).as_json },
      exhibitions:  GalleryMedia.exhibition.map  { |m| GalleryMediaSerializer.new(m).as_json },
      events:       GalleryMedia.event.map       { |m| GalleryMediaSerializer.new(m).as_json },
      workshops:    GalleryMedia.workshop.map    { |m| GalleryMediaSerializer.new(m).as_json }
    }
  end
end
