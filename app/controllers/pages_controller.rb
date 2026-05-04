class PagesController < ApplicationController
  include Rails.application.routes.url_helpers

  ARTIST_DATA = {
    name: "Cyrus Baptiste",
    photo: "image1.jpeg",
    bio: "Nací en Puerto España Trinidad y Tobago, mi madre es mexicana (San Luis R.C. Son) y mi padre antillano. He vivido, estudiado y trabajado la mayor parte de mi vida entre Estados unidos y México. Esta mezcla cultural y racial ha influenciado mi producción artística y mi percepción de la sociedad; principalmente aspectos que giran alrededor de la discriminación racial y la tolerancia. Trato a través de colores brillantes y formas incitar un dialogo entre el espectador y mi obra, con el fin de encontrarme como persona y artista.",
    bio2: "Me considero un artista que se encuentra en constante cambio y aprendizaje, me desempeño como maestro de Ingles particular y traductor. Esta faceta simultanea tanto de artista como maestro me permite poder observar y aprender de mis alumnos, también es un ejercicio constante de observar y ser observado.",
    bio3: "Mi participación en exposiciones colectivas e individuales, he tenido la fortuna de exhibir mi obra y mi propuesta a nivel nacional en museos, galerías, bibliotecas y espacios culturales en ciudades como Zacatecas, León, Oaxaca, Ciudad de México, Mexicali y Monterrey; y a nivel internacional en países como Colombia, Francia, Italia, España y la India.",
    gallery_info: "Arena Negra es un proyecto que, en 2024 nació del deseo de crear un espacio independiente para el arte en el centro de Monterrey, dentro del Semillero Purísima. Funciona como galería y escuela de arte, donde promuevo el trabajo de artistas emergentes, produzco obra propia y comparto mi experiencia dando clases a distintas generaciones. Es un proyecto en construcción constante, en el que he ido aprendiendo sobre la marcha, enfrentando los retos de sostener un espacio cultural mientras exploro nuevas formas de conectar con la comunidad artística y con el público.",
    instagram_gallery: "https://www.instagram.com/arenanegragaleria",
    instagram_artist: "https://www.instagram.com/cyrusbaptiste.artist"
  }.freeze

  def home
    render inertia: "Home", props: {
      artist: ARTIST_DATA,
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
      artwork: artwork_to_hash(record),
      prev_id: idx > 0 ? all[idx - 1].id : nil,
      next_id: idx < all.length - 1 ? all[idx + 1].id : nil
    }
  end

  def arena_negra
    render inertia: "ArenaNegra", props: {
      artworks: artworks_data,
      gallery_media: gallery_media_data,
      gallery_info: ARTIST_DATA[:gallery_info],
      instagram_gallery: ARTIST_DATA[:instagram_gallery]
    }
  end

  def bio
    render inertia: "Bio", props: { artist: ARTIST_DATA }
  end

  def contact
    render inertia: "Contact", props: {}
  end

  def send_message
    name    = params[:name]&.strip
    email   = params[:email]&.strip
    message = params[:message]&.strip

    if [ name, email, message ].all?(&:present?)
      ContactMailer.message(name: name, email: email, body: message).deliver_later
      redirect_to contact_path, notice: "¡Gracias! Tu mensaje ha sido enviado. Te responderé pronto."
    else
      redirect_to contact_path, alert: "Por favor completa todos los campos."
    end
  end

  private

  def artwork_to_hash(artwork)
    image_path     = artwork.image.attached? ? rails_blob_path(artwork.image, only_path: true) : nil
    thumbnail_path = begin
      artwork.image.attached? ? rails_representation_path(artwork.image.variant(resize_to_limit: [ 800, 1000 ]), only_path: true) : nil
    rescue
      image_path
    end

    {
      id: artwork.id,
      title: artwork.title,
      year: artwork.year,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      image: image_path,
      thumbnail: thumbnail_path
    }
  end

  def artworks_data
    Artwork.all.map { |artwork| artwork_to_hash(artwork) }
  end

  def gallery_media_data
    {
      student_work: GalleryMedia.student_work.map { |m| media_to_hash(m) },
      exhibitions:  GalleryMedia.exhibition.map  { |m| media_to_hash(m) },
      events:       GalleryMedia.event.map       { |m| media_to_hash(m) },
      workshops:    GalleryMedia.workshop.map    { |m| media_to_hash(m) }
    }
  end

  def media_to_hash(media)
    file_path = media.file.attached? ? rails_blob_path(media.file, only_path: true) : nil
    thumbnail_path = begin
      if media.image? && media.file.attached?
        rails_representation_path(media.file.variant(resize_to_limit: [ 800, 800 ]), only_path: true)
      else
        file_path
      end
    rescue
      file_path
    end

    {
      id: media.id,
      title: media.title,
      description: media.description,
      category: media.category,
      media_type: media.media_type,
      credit: media.credit,
      file_url: file_path,
      thumbnail_url: thumbnail_path
    }
  end
end
