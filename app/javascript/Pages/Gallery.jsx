import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Head, Link } from '@inertiajs/react'

export default function Gallery({ artworks }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [filterYear, setFilterYear] = useState(null)

  const years = [...new Set(artworks.map(a => a.year).filter(Boolean))].sort()
  const filtered = filterYear ? artworks.filter(a => String(a.year) === String(filterYear)) : artworks

  useEffect(() => {
    if (!selectedArtwork) return
    const idx = artworks.findIndex(a => a.id === selectedArtwork.id)

    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedArtwork(null)
      if (e.key === 'ArrowRight' && idx < artworks.length - 1) setSelectedArtwork(artworks[idx + 1])
      if (e.key === 'ArrowLeft' && idx > 0) setSelectedArtwork(artworks[idx - 1])
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedArtwork, artworks])

  return (
    <Layout>
      <Head>
        <title>Gallery — Cyrus Baptiste</title>
        <meta name="description" content="Paintings and works by Cyrus Baptiste — oil on canvas, acrylic, tempera, and mixed media. Based in Monterrey, Mexico." />
        <meta property="og:title" content="Gallery — Cyrus Baptiste" />
        <meta property="og:description" content="Paintings and works by Cyrus Baptiste — artist and educator based in Monterrey, Mexico." />
      </Head>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 text-center">
        <p className="font-space text-xs sm:text-sm tracking-[0.25em] uppercase text-base-content/40 mb-3 sm:mb-4">Portfolio</p>
        <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal">Gallery</h1>
        <p className="font-space mt-4 text-base-content/40 text-xs tracking-widest uppercase tabular-nums">
          {filterYear ? `${filtered.length} work${filtered.length !== 1 ? 's' : ''} · ${filterYear}` : `${artworks.length} works`}
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Year filter */}
          {years.length > 1 && (
            <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-1">
              <button
                className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-[0.2em] uppercase transition-all duration-200 border ${
                  !filterYear
                    ? 'bg-base-content text-base-100 border-base-content'
                    : 'border-base-content/20 text-base-content/50 hover:border-base-content/50'
                }`}
                onClick={() => setFilterYear(null)}
              >
                All <span className="ml-1 opacity-60">{artworks.length}</span>
              </button>
              {years.map(year => (
                <button
                  key={year}
                  className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-[0.2em] uppercase transition-all duration-200 border ${
                    String(filterYear) === String(year)
                      ? 'bg-base-content text-base-100 border-base-content'
                      : 'border-base-content/20 text-base-content/50 hover:border-base-content/50'
                  }`}
                  onClick={() => setFilterYear(String(filterYear) === String(year) ? null : year)}
                >
                  {year} <span className="ml-1 opacity-60">{artworks.filter(a => String(a.year) === String(year)).length}</span>
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filtered.map((artwork) => (
              <div
                key={artwork.id}
                className="group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative overflow-hidden bg-base-200 aspect-[4/5] rounded-xl">
                  <img
                    src={artwork.thumbnail || artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full">
                    <span className="text-sm text-base-content/30">{artwork.title}</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    {/* Floating pill badge */}
                    <div className="absolute top-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-space inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 text-[11px] tracking-widest uppercase shadow-lg font-medium">
                        Explorar
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <p className="font-cormorant text-white text-lg font-medium leading-snug">{artwork.title}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-space text-white/70 text-xs">{artwork.year}</span>
                        {artwork.medium && (
                          <>
                            <span className="text-white/30 text-xs">·</span>
                            <span className="text-white/60 text-xs line-clamp-1">{artwork.medium}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 space-y-1">
                  <h3 className="font-cormorant text-base sm:text-lg font-semibold group-hover:opacity-70 transition-opacity">{artwork.title}</h3>
                  <p className="font-space text-xs text-base-content/50 tracking-wider uppercase">{artwork.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for artwork details */}
      {selectedArtwork && (() => {
        const idx = artworks.findIndex(a => a.id === selectedArtwork.id)
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedArtwork(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedArtwork(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev / Next arrows */}
            {idx > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                onClick={(e) => { e.stopPropagation(); setSelectedArtwork(artworks[idx - 1]) }}
                aria-label="Previous artwork"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {idx < artworks.length - 1 && (
              <button
                className="absolute right-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                onClick={(e) => { e.stopPropagation(); setSelectedArtwork(artworks[idx + 1]) }}
                aria-label="Next artwork"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div
              className="max-w-5xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-base-200 aspect-[4/5] flex items-center justify-center">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>

                <div className="flex flex-col justify-center text-white">
                  <h2 className="text-3xl md:text-4xl font-light mb-6">{selectedArtwork.title}</h2>
                  <div className="space-y-4 text-white/70">
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-sm tracking-wide uppercase">Year</span>
                      <span>{selectedArtwork.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-sm tracking-wide uppercase">Medium</span>
                      <span className="text-right max-w-[200px]">{selectedArtwork.medium}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-sm tracking-wide uppercase">Dimensions</span>
                      <span>{selectedArtwork.dimensions}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm px-5 py-3 bg-white text-black hover:bg-white/90 transition-colors"
                    >
                      ¿Interesado? Contactar
                    </Link>
                    <Link
                      href={`/gallery/${selectedArtwork.id}`}
                      className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      Ver página completa
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </Layout>
  )
}
