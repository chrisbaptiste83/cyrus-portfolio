import React from 'react'
import Layout from './Layout'
import { Link } from '@inertiajs/react'

export default function Home({ artist, artworks }) {
  return (
    <Layout>
      {/* Hero Section with Artist Photo */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Artist Photo */}
            <div className="flex-shrink-0">
              <div className="w-40 sm:w-48 lg:w-56 aspect-[3/4] overflow-hidden bg-base-200 rounded-2xl">
                <img
                  src={`/images/${artist.photo}`}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1">
              <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-base-content/40 mb-3 sm:mb-4">
                Artist & Educator
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 sm:mb-6">
                {artist.name}
              </h1>
              <p className="text-base text-base-content/60 max-w-xl leading-relaxed mb-6">
                Exploring identity, race, and tolerance through vibrant colors and bold forms. Based in Monterrey, Mexico.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-3 text-sm tracking-wide border-b border-base-content/30 pb-1 hover:border-base-content transition-colors"
                >
                  View Gallery
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={artist.instagram_artist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content/40 hover:text-base-content transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Grid */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 bg-base-200/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-2">Portfolio</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">Selected Works</h2>
            </div>
            <Link
              href="/gallery"
              className="text-sm text-base-content/50 hover:text-base-content transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {artworks.slice(0, 8).map((artwork, index) => (
              <Link
                key={artwork.id}
                href="/gallery"
                className={`group relative overflow-hidden bg-base-200 rounded-xl ${
                  index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`aspect-square ${index === 0 || index === 5 ? 'md:aspect-auto md:h-full' : ''}`}>
                  <img
                    src={`/images/${artwork.image}`}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full bg-base-200">
                    <span className="text-xs text-base-content/30 text-center px-4">{artwork.title}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-white font-medium">{artwork.title}</p>
                    <p className="text-white/60 text-sm mt-1">{artwork.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-2">About</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">The Artist</h2>
              <div className="space-y-6 text-base-content/70 leading-relaxed">
                <p>{artist.bio}</p>
                <p>{artist.bio2}</p>
              </div>
            </div>
            <div className="space-y-12">
              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-4">Exhibitions</p>
                <p className="text-base-content/70 leading-relaxed">{artist.bio3}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-light">6+</p>
                  <p className="text-sm text-base-content/50 mt-2">Countries</p>
                </div>
                <div>
                  <p className="text-4xl font-light">MX</p>
                  <p className="text-sm text-base-content/50 mt-2">Based in Monterrey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arena Negra Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 bg-base-200/30">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-base-content/40 mb-2">Gallery & Art School</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">Arena Negra</h2>
            <p className="text-base-content/70 leading-relaxed mb-8">
              {artist.gallery_info}
            </p>
            <a
              href={artist.instagram_gallery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm tracking-wide border-b border-base-content/30 pb-1 hover:border-base-content transition-colors"
            >
              Follow Arena Negra
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 text-center">
        <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-base-content/40 mb-3 sm:mb-4">Get in touch</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">Interested in a piece?</h2>
        <a
          href={artist.instagram_artist}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 border border-base-content/20 hover:bg-base-content hover:text-base-100 transition-all duration-300"
        >
          Contact via Instagram
        </a>
      </section>
    </Layout>
  )
}
