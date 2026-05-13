import React, { useEffect, useRef, useState } from 'react'
import Layout from './Layout'
import { Head, Link } from '@inertiajs/react'
import ExhibitionMap from '../components/ExhibitionMap'
import Reveal from '../components/Reveal'

function AnimatedNumber({ target, suffix = '', inView }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setValue(Math.floor(start))
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])
  return <>{value}{suffix}</>
}

const TIMELINE = [
  {
    year: '2014',
    event: 'Primera exposición',
    detail: 'Inicio de la trayectoria expositiva en México.',
  },
  {
    year: '2015–17',
    event: 'Obras fundamentales',
    detail: 'Chico negro de la perla, Molting and Regeneration, Desahogo, Butchqueen, Frazzled.',
  },
  {
    year: '2015–22',
    event: 'Circuito nacional',
    detail: 'Exposiciones en Zacatecas, León, Oaxaca, Ciudad de México, Mexicali y Monterrey.',
  },
  {
    year: '2018–22',
    event: 'Presencia internacional',
    detail: 'Participación en Colombia, Francia, Italia, España e India.',
  },
  {
    year: '2024',
    event: 'Arena Negra',
    detail: 'Fundación de la galería y escuela de arte en Semillero Purísima, Monterrey.',
  },
]

export default function Bio({ artist }) {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Bio — Cyrus Baptiste</title>
        <meta name="description" content="Cyrus Baptiste — artista y educador basado en Monterrey, México. Exploring identity, race, and tolerance through vibrant colors and bold forms." />
        <meta property="og:title" content="Bio — Cyrus Baptiste" />
        <meta property="og:description" content="Artist and educator based in Monterrey, Mexico. Exploring identity, race, and tolerance through vibrant colors and bold forms." />
      </Head>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-base-content/40 mb-3 sm:mb-4">Artist</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">{artist.name}</h1>
          <p className="mt-4 text-base-content/50 tracking-wide">Artist & Educator — Monterrey, México</p>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto pt-12 sm:pt-16">
          <Reveal>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-1">
                <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Declaración</p>
              </div>
              <div className="lg:col-span-2 space-y-6 text-base-content/70 leading-relaxed text-lg">
                <p>{artist.bio}</p>
                <p>{artist.bio2}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Exhibitions */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-1">
                <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Exposiciones</p>
              </div>
              <div className="lg:col-span-2">
                <p className="text-base-content/70 leading-relaxed mb-10">{artist.bio3}</p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-base-content/40 mb-4">Nacional</p>
                    <ul className="space-y-2">
                      {['Zacatecas', 'León', 'Oaxaca', 'Ciudad de México', 'Mexicali', 'Monterrey'].map(city => (
                        <li key={city} className="text-base-content/70 text-sm flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-base-content/30 inline-block" />
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-base-content/40 mb-4">Internacional</p>
                    <ul className="space-y-2">
                      {['Colombia', 'Francia', 'Italia', 'España', 'India'].map(country => (
                        <li key={country} className="text-base-content/70 text-sm flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-base-content/30 inline-block" />
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Exhibition Map */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-1">
                <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Trayectoria</p>
                <p className="text-sm text-base-content/50 mt-4 leading-relaxed">
                  Ciudades y países donde Cyrus ha exhibido su obra. Pasa el cursor sobre cada punto para más información.
                </p>
              </div>
              <div className="lg:col-span-2">
                <ExhibitionMap />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-1">
                <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Cronología</p>
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-0">
                  {TIMELINE.map((item, i) => (
                    <Reveal key={item.year} delay={i * 80}>
                      <div className="relative pl-8 pb-10 last:pb-0">
                        {/* Vertical line */}
                        {i < TIMELINE.length - 1 && (
                          <span className="absolute left-[5px] top-4 bottom-0 w-px bg-base-content/12" />
                        )}
                        {/* Dot */}
                        <span className="absolute left-0 top-[7px] w-3 h-3 rounded-full border border-base-content/30 bg-base-100 flex items-center justify-center">
                          <span className={`w-1.5 h-1.5 rounded-full ${i === TIMELINE.length - 1 ? 'bg-base-content' : 'bg-base-content/40'}`} />
                        </span>
                        <div>
                          <p className="text-xs tracking-[0.2em] uppercase text-base-content/40 mb-1">{item.year}</p>
                          <p className="font-medium mb-1">{item.event}</p>
                          <p className="text-sm text-base-content/60 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Practice */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-1">
                <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Técnicas</p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-3">
                  {['Óleo sobre tela', 'Acrílico sobre tela', 'Temple sobre tela', 'Hoja de oro', 'Óleo sobre madera', 'Óleo sobre cartón'].map(medium => (
                    <span
                      key={medium}
                      className="px-4 py-2 border border-base-content/15 text-sm text-base-content/60 hover:border-base-content/40 hover:text-base-content/80 transition-colors cursor-default"
                    >
                      {medium}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Arena Negra */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-1">
                <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Galería</p>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-light mb-4">Arena Negra</h2>
                <p className="text-base-content/70 leading-relaxed mb-8">{artist.gallery_info}</p>

                {/* Location map */}
                <div className="mb-8">
                  <p className="text-xs tracking-[0.2em] uppercase text-base-content/40 mb-3">Ubicación — Semillero Purísima, Monterrey</p>
                  <div className="relative overflow-hidden border border-base-content/10" style={{ paddingBottom: '46%' }}>
                    <iframe
                      title="Arena Negra — Semillero Purísima, Monterrey"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-100.3200%2C25.6720%2C-100.2974%2C25.6920&layer=mapnik&marker=25.6820%2C-100.3087"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-xs text-base-content/30 mt-1">
                    © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-base-content/60 transition-colors">OpenStreetMap</a> contributors
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/arena-negra"
                    className="inline-flex items-center gap-3 text-sm tracking-wide border-b border-base-content/30 pb-1 hover:border-base-content transition-colors"
                  >
                    Visit Arena Negra
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href={artist.instagram_gallery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm tracking-wide border-b border-base-content/30 pb-1 hover:border-base-content transition-colors"
                  >
                    @arenanegragaleria
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats with animated counters */}
      <section
        ref={statsRef}
        className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10 bg-base-200/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-light tabular-nums">
                <AnimatedNumber target={2014} inView={statsVisible} />
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-base-content/40 mt-2">Primera exposición</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light tabular-nums">
                <AnimatedNumber target={6} suffix="+" inView={statsVisible} />
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-base-content/40 mt-2">Países</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light tabular-nums">
                <AnimatedNumber target={2024} inView={statsVisible} />
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-base-content/40 mt-2">Arena Negra</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light">MTY</p>
              <p className="text-xs tracking-[0.15em] uppercase text-base-content/40 mt-2">Monterrey, MX</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 text-center border-t border-base-content/10">
        <Reveal>
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light mb-6">Interested in my work?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 px-8 py-4 border border-base-content/20 hover:bg-base-content hover:text-base-100 transition-all duration-300 text-sm"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-base-content/20 hover:bg-base-content hover:text-base-100 transition-all duration-300 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  )
}
