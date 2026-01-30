class PagesController < ApplicationController
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
      videos: videos_data,
      gallery_info: "Arena Negra es un proyecto que, en 2024 nació del deseo de crear un espacio independiente para el arte en el centro de Monterrey, dentro del Semillero Purísima. Funciona como galería y escuela de arte, donde promuevo el trabajo de artistas emergentes, produzco obra propia y comparto mi experiencia dando clases a distintas generaciones. Es un proyecto en construcción constante, en el que he ido aprendiendo sobre la marcha, enfrentando los retos de sostener un espacio cultural mientras exploro nuevas formas de conectar con la comunidad artística y con el público.",
      instagram_gallery: "https://www.instagram.com/arenanegragaleria"
    }
  end

  private

  def artworks_data
    [
      { id: 1, title: "Autorretrato 2022: Entre el goce y el placer", year: "2022", medium: "Óleo, temple y hoja de oro sobre lienzo y madera", dimensions: "100 cm", image: "image2.jpeg" },
      { id: 2, title: "Chico negro de la perla", year: "2017", medium: "Óleo sobre tela", dimensions: "60 x 50 cm", image: "image3.jpeg" },
      { id: 3, title: "Molting and Regeneration", year: "2017", medium: "Óleo y acrílico sobre tela", dimensions: "190 x 180 cm", image: "image4.jpeg" },
      { id: 4, title: "Nomadic Foreigner", year: "2014", medium: "Óleo sobre tela", dimensions: "110 x 87 cm", note: "Colección Privada GRUPO REFORMA", image: "image5.png" },
      { id: 5, title: "Suckerpunched", year: "2014", medium: "Óleo sobre tela", dimensions: "100 x 80 cm", image: "image6.jpeg" },
      { id: 6, title: "Desahogo", year: "2017", medium: "Óleo sobre tela", dimensions: "70 x 110.5 cm", image: "image7.jpeg" },
      { id: 7, title: "Butchqueen", year: "2016", medium: "Óleo sobre tela", dimensions: "80 x 60 cm", image: "image8.jpeg" },
      { id: 8, title: "Frazzled", year: "2015", medium: "Óleo sobre tela", dimensions: "90 x 70 cm", image: "image9.jpeg" },
      { id: 9, title: "Metformina", year: "2018", medium: "Óleo sobre hoja de cartón", dimensions: "45 x 35 cm", image: "image10.jpeg" },
      { id: 10, title: "Tlacuache", year: "2018", medium: "Temple sobre tela", dimensions: "50 x 50 cm", image: "image11.jpeg" },
      { id: 11, title: "Julio", year: "2015", medium: "Acrílico sobre tela", dimensions: "90 x 70 cm", image: "image12.jpeg" },
      { id: 12, title: "Infestation", year: "2015", medium: "Óleo sobre tela", dimensions: "60 x 80 cm", image: "image13.jpeg" },
      { id: 13, title: "Effervescent", year: "2015", medium: "Óleo sobre tela", dimensions: "90 x 70 cm", image: "image14.jpeg" },
      { id: 14, title: "Mafriend", year: "2015", medium: "Óleo sobre tela", dimensions: "90 x 70 cm", image: "image15.jpeg" }
    ]
  end

  def videos_data
    [
      { id: 1, filename: "8cac1188-17be-4e9e-b6a3-d6c8d4aa3e4a.MP4" },
      { id: 2, filename: "e271b166-6141-48b2-8f5c-2e3cda478bb8.MP4" },
      { id: 3, filename: "ebb0f7b1-00e0-43f3-ac0d-738526af8eec.MP4" },
      { id: 4, filename: "f3374a70-99e0-455c-89fb-fee8ac9dc9e8.MP4" }
    ]
  end
end
