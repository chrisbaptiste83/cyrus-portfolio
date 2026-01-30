import React, { useState } from 'react'
import Layout from './Layout'

export default function ArenaNegra({ videos, gallery_info, instagram_gallery }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentVideo = videos[currentIndex] || null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1))
  }

  return (
    <Layout>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 text-center">
        <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-base-content/40 mb-3 sm:mb-4">Gallery & Art School</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">Arena Negra</h1>
      </section>

      {/* About Section */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base-content/70 leading-relaxed mb-8">
            {gallery_info}
          </p>
          <a
            href={instagram_gallery}
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
      </section>

      {/* Video Player with Navigation */}
      {currentVideo && videos.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-content/10 flex items-center justify-center hover:bg-base-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-content/10 flex items-center justify-center hover:bg-base-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Video */}
              <div className="bg-base-200 rounded-xl overflow-hidden aspect-video">
                <video
                  key={currentVideo.id}
                  src={`/videos/${currentVideo.filename}`}
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                />
              </div>
            </div>

          </div>
        </section>
      )}
    </Layout>
  )
}
