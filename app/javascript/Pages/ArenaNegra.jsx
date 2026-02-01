import React, { useState } from 'react'
import Layout from './Layout'
import { Link } from '@inertiajs/react'

export default function ArenaNegra({ videos, artworks, gallery_info, instagram_gallery }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentVideo = videos[currentIndex] || null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1))
  }

  // Get featured artworks for the hero background
  const featuredArtwork = artworks[0]
  const showcaseArtworks = artworks.slice(0, 6)

  return (
    <Layout>
      {/* Hero Section with Artwork Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Artwork Collage */}
        <div className="absolute inset-0 grid grid-cols-3 opacity-20">
          {artworks.slice(0, 6).map((artwork, i) => (
            <div key={artwork.id} className="relative overflow-hidden">
              <img
                src={artwork.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-base-100/90 to-base-100" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-10 py-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-base-content/30" />
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-base-content/50">
              Gallery & Art School
            </p>
            <span className="w-8 h-px bg-base-content/30" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            Arena Negra
          </h1>

          <p className="text-base-content/50 text-lg sm:text-xl max-w-md mx-auto mb-8">
            Un espacio independiente para el arte en el corazón de Monterrey
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={instagram_gallery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-base-content text-base-100 hover:bg-base-content/90 transition-colors text-sm sm:text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <circle cx="12" cy="12" r="3.5"/>
              </svg>
              Follow Us
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 text-sm tracking-wide border-b border-base-content/30 pb-1 hover:border-base-content transition-colors"
            >
              View Artist Gallery
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section with Side Artwork */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-4">Sobre Nosotros</p>
              <h2 className="text-3xl sm:text-4xl font-light mb-8">Un Espacio Para el Arte</h2>
              <div className="space-y-6 text-base-content/70 leading-relaxed">
                <p className="text-lg">{gallery_info}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-base-content/10">
                <div>
                  <p className="text-3xl font-light">2024</p>
                  <p className="text-sm text-base-content/50 mt-1">Fundado</p>
                </div>
                <div>
                  <p className="text-3xl font-light">MTY</p>
                  <p className="text-sm text-base-content/50 mt-1">Ubicación</p>
                </div>
                <div>
                  <p className="text-3xl font-light">&infin;</p>
                  <p className="text-sm text-base-content/50 mt-1">Creatividad</p>
                </div>
              </div>
            </div>

            {/* Artwork Display */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {showcaseArtworks.slice(0, 4).map((artwork, index) => (
                  <Link
                    key={artwork.id}
                    href="/gallery"
                    className={`group relative overflow-hidden rounded-lg ${
                      index === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                    }`}
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">{artwork.title}</p>
                        <p className="text-white/60 text-xs">{artwork.year}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-base-content/10 rounded-lg -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-base-content/10 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      {currentVideo && videos.length > 0 && (
        <section className="bg-base-200/50 py-16 sm:py-20 lg:py-24">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-light">Videos del Estudio</h2>
              </div>

              {/* Main Video Player */}
              <div className="max-w-4xl mx-auto">
                <div className="relative group">
                  {/* Navigation Arrows - Always visible on mobile, hover on desktop */}
                  <button
                    onClick={goToPrevious}
                    className="absolute -left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute -right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Video Container */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <video
                      key={currentVideo.id}
                      src={currentVideo.filename}
                      className="w-full aspect-video"
                      controls
                      playsInline
                    />
                  </div>
                </div>

                {/* Video Indicators */}
                {videos.length > 1 && (
                  <div className="flex justify-center gap-3 mt-8">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-base-content scale-100'
                            : 'bg-base-content/30 hover:bg-base-content/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Artworks Marquee */}
      <section className="py-16 sm:py-20 overflow-hidden">
        <div className="mb-8 px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-2">Obras Destacadas</p>
              <h2 className="text-2xl sm:text-3xl font-light">Del Artista</h2>
            </div>
            <Link
              href="/gallery"
              className="text-sm text-base-content/50 hover:text-base-content transition-colors"
            >
              Ver todas
            </Link>
          </div>
        </div>

        {/* Scrolling Artwork Strip */}
        <div className="relative px-4 sm:px-0">
          <div className="flex gap-4 sm:gap-6 animate-marquee hover:pause">
            {[...artworks, ...artworks].map((artwork, index) => (
              <Link
                key={`${artwork.id}-${index}`}
                href="/gallery"
                className="flex-shrink-0 group"
              >
                <div className="w-48 sm:w-64 md:w-72 aspect-[4/5] overflow-hidden rounded-lg sm:rounded-xl bg-base-200">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 sm:mt-3 px-1">
                  <p className="font-medium text-xs sm:text-sm group-hover:text-base-content/70 transition-colors truncate">{artwork.title}</p>
                  <p className="text-xs text-base-content/50">{artwork.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Visit CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 bg-base-content text-base-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-base-100/50 mb-4">Visítanos</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">Semillero Purísima, Monterrey</h2>
          <p className="text-base-100/60 mb-10 max-w-2xl mx-auto">
            Ven a conocer nuestro espacio, tomar una clase de arte, o simplemente disfrutar de las exposiciones actuales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={instagram_gallery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-base-100 text-base-content hover:bg-base-100/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <circle cx="12" cy="12" r="3.5"/>
              </svg>
              Síguenos en Instagram
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 border border-base-100/30 hover:bg-base-100/10 transition-colors"
            >
              Conoce al Artista
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
