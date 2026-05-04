import React from 'react'
import Layout from './Layout'
import { Head, Link } from '@inertiajs/react'

export default function ArtworkShow({ artwork, prev_id, next_id }) {
  return (
    <Layout>
      <Head>
        <title>{artwork.title} — Cyrus Baptiste</title>
        <meta name="description" content={`${artwork.title}${artwork.year ? `, ${artwork.year}` : ''}${artwork.medium ? `. ${artwork.medium}` : ''}.`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${artwork.title} — Cyrus Baptiste`} />
        <meta property="og:description" content={[artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(' · ')} />
        {artwork.image && <meta property="og:image" content={`https://cyrusbaptiste.com${artwork.image}`} />}
      </Head>

      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors mb-10 sm:mb-14"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Gallery
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="bg-base-200 rounded-2xl overflow-hidden flex items-center justify-center">
              {artwork.image ? (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full object-contain max-h-[75vh]"
                />
              ) : (
                <div className="aspect-[4/5] w-full flex items-center justify-center">
                  <span className="text-base-content/30">{artwork.title}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-24">
              <p className="text-xs tracking-[0.25em] uppercase text-base-content/40 mb-4">Obra</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-10">{artwork.title}</h1>

              <div className="divide-y divide-base-content/10 border-t border-base-content/10">
                {artwork.year && (
                  <div className="flex justify-between py-4">
                    <span className="text-sm tracking-wide uppercase text-base-content/50">Año</span>
                    <span>{artwork.year}</span>
                  </div>
                )}
                {artwork.medium && (
                  <div className="flex justify-between py-4 gap-8">
                    <span className="text-sm tracking-wide uppercase text-base-content/50 shrink-0">Técnica</span>
                    <span className="text-right">{artwork.medium}</span>
                  </div>
                )}
                {artwork.dimensions && (
                  <div className="flex justify-between py-4">
                    <span className="text-sm tracking-wide uppercase text-base-content/50">Dimensiones</span>
                    <span>{artwork.dimensions}</span>
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-base-content text-base-100 hover:bg-base-content/90 transition-all duration-300 text-sm"
                >
                  ¿Interesado? Contactar
                </Link>
                <a
                  href="https://www.instagram.com/cyrusbaptiste.artist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-base-content/20 hover:bg-base-content hover:text-base-100 transition-all duration-300 text-sm"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          {(prev_id || next_id) && (
            <div className="flex justify-between items-center mt-16 sm:mt-24 pt-8 border-t border-base-content/10">
              {prev_id ? (
                <Link
                  href={`/gallery/${prev_id}`}
                  className="inline-flex items-center gap-3 text-sm text-base-content/50 hover:text-base-content transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Anterior
                </Link>
              ) : <span />}
              {next_id ? (
                <Link
                  href={`/gallery/${next_id}`}
                  className="inline-flex items-center gap-3 text-sm text-base-content/50 hover:text-base-content transition-colors"
                >
                  Siguiente
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : <span />}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
