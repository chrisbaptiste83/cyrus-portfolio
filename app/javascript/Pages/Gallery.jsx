import React, { useState } from 'react'
import Layout from './Layout'

export default function Gallery({ artworks }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  return (
    <Layout>
      {/* Header */}
      <section className="px-6 lg:px-10 py-24 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-base-content/40 mb-4">Portfolio</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light">Gallery</h1>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 lg:px-10 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative overflow-hidden bg-base-200 aspect-[4/5] rounded-xl">
                  <img
                    src={`/images/${artwork.image}`}
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-medium group-hover:opacity-70 transition-opacity">{artwork.title}</h3>
                  <p className="text-sm text-base-content/50">{artwork.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for artwork details */}
      {selectedArtwork && (
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

          <div
            className="max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-base-200 aspect-[4/5] flex items-center justify-center">
                <img
                  src={`/images/${selectedArtwork.image}`}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
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
                  {selectedArtwork.note && (
                    <p className="text-sm italic pt-4 text-white/50">{selectedArtwork.note}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
