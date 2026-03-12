class PagesController < ApplicationController
  include Rails.application.routes.url_helpers

  def home
    render inertia: "Home", props: {
      artist: {
        name: "Cyrus Baptiste",
        photo: "image1.jpeg",
        bio: "Nací en Puerto España Trinidad y Tobago, mi madre es mexicana (San Luis R.C. Son) y mi padre antillano. He vivido, estudiado y trabajado la mayor parte de mi vida entre Estados unidos y México. Esta mezcla cultural y racial ha influenciado mi producción artística y mi percepción de la sociedad; principalmente aspectos que giran alrededor de la discriminación racial y la tolerancia. Trato a través de colores brillantes y formas incitar un dialogo entre el espectador y mi obra, con el fin de encontrarme como persona y artista.",
        bio2: "Me considero un artista que se encuentra en constante cambio y aprendizaje, me desempeño como maestro de Ingles particular y traductor. Esta faceta simultanea tanto de artista como maestro me permite poder observar y aprender de mis alumnos, también es un ejercicio constante de observar y ser observado.",
        bio3: "Mi participación en exposiciones colectivas e individuales, he tenido la fortuna de exhibir mi obra y mi propuesta a nivel nacional en museos, galerías, bibliotecas y espacios culturales en ciudades como Zacatecas, León, Oaxaca, Ciudad de México, Mexicali y Monterrey; y a nivel internacional en países como Colombia, Francia, Italia, España y la India.",
        gallery_info: "Arena Negra es un proyecto que, en 2024 nació del deseo de crear un espacio independiente para el arte en el centro de Monterrey, dentro del Semillero Purísima. Funciona como galería y escuela de arte, donde promuevo el trabajo de artistas emergentes, produzco obra propia y comparto mi experiencia dando clases a distintas generaciones. Es un proyecto en construcción constante, en el que he ido aprendiendo sobre la marcha, enfrentando los retos de sostener un espacio cultural mientras exploro nuevas formas de conectar con la comunidad artística y con el público.",
        instagram_gallery: "https://www.instagram.com/arenanegragaleria",
        instagram_artist: "https://www.instagram.com/cyrusbaptiste.artist"
      },
      artworks: artworks_data
    }
  end

  def gallery
    render inertia: "Gallery", props: {
      artworks: artworks_data
    }
  end

  def arena_negra
    render inertia: "ArenaNegra", props: {
      artworks: artworks_data,
      gallery_media: gallery_media_data,
      gallery_info: "Arena Negra es un proyecto que, en 2024 nació del deseo de crear un espacio independiente para el arte en el centro de Monterrey, dentro del Semillero Purísima. Funciona como galería y escuela de arte, donde promuevo el trabajo de artistas emergentes, produzco obra propia y comparto mi experiencia dando clases a distintas generaciones. Es un proyecto en construcción constante, en el que he ido aprendiendo sobre la marcha, enfrentando los retos de sostener un espacio cultural mientras exploro nuevas formas de conectar con la comunidad artística y con el público.",
      instagram_gallery: "https://www.instagram.com/arenanegragaleria"
    }
  end

  private

  def artworks_data
    Artwork.all.map do |artwork|
      {
        id: artwork.id,
        title: artwork.title,
        year: artwork.year,
        medium: artwork.medium,
        dimensions: artwork.dimensions,
        image: artwork.image.attached? ? rails_blob_path(artwork.image, only_path: true) : nil
      }
    end
  end

  def gallery_media_data
    {
      student_work: GalleryMedia.student_work.map { |m| media_to_hash(m) },
      exhibitions: GalleryMedia.exhibition.map { |m| media_to_hash(m) },
      events: GalleryMedia.event.map { |m| media_to_hash(m) },
      workshops: GalleryMedia.workshop.map { |m| media_to_hash(m) }
    }
  end

  def media_to_hash(media)
    {
      id: media.id,
      title: media.title,
      description: media.description,
      category: media.category,
      media_type: media.media_type,
      credit: media.credit,
      file_url: media.file.attached? ? rails_blob_path(media.file, only_path: true) : nil
    }
  end
end
