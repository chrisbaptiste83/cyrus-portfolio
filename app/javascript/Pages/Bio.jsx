import React from 'react'
import Layout from './Layout'
import { Head, Link } from '@inertiajs/react'

export default function Bio({ artist }) {
  const nationalCities = ['Zacatecas', 'León', 'Oaxaca', 'Ciudad de México', 'Mexicali', 'Monterrey']
  const internationalCountries = ['Colombia', 'Francia', 'Italia', 'España', 'India']

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
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-1">
              <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Declaración</p>
            </div>
            <div className="lg:col-span-2 space-y-6 text-base-content/70 leading-relaxed text-lg">
              <p>{artist.bio}</p>
              <p>{artist.bio2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
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
                    {nationalCities.map(city => (
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
                    {internationalCountries.map(country => (
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
        </div>
      </section>

      {/* Practice */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-1">
              <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Técnicas</p>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3">
                {['Óleo sobre tela', 'Acrílico sobre tela', 'Temple sobre tela', 'Hoja de oro', 'Óleo sobre madera', 'Óleo sobre cartón'].map(medium => (
                  <span
                    key={medium}
                    className="px-4 py-2 border border-base-content/15 text-sm text-base-content/60"
                  >
                    {medium}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arena Negra */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-1">
              <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mt-1">Galería</p>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-light mb-4">Arena Negra</h2>
              <p className="text-base-content/70 leading-relaxed mb-6">{artist.gallery_info}</p>
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
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 border-t border-base-content/10 bg-base-200/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-light">2014</p>
              <p className="text-xs tracking-[0.15em] uppercase text-base-content/40 mt-2">Primera exposición</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light">6+</p>
              <p className="text-xs tracking-[0.15em] uppercase text-base-content/40 mt-2">Países</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-light">2024</p>
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
      </section>
    </Layout>
  )
}
