import React, { useState } from 'react'
import Layout from './Layout'
import { Head, Link } from '@inertiajs/react'

export default function ArtworkShow({ artwork, prev_id, next_id }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isInquiring, setIsInquiring] = useState(false)
  const [inquirySent, setInquirySent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: `Interesado en adquirir la obra: "${artwork.title}" (${[artwork.year, artwork.dimensions].filter(Boolean).join(', ')}).` })

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    setInquirySent(true)
    setTimeout(() => {
      setIsInquiring(false)
      setInquirySent(false)
    }, 2000)
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": artwork.title,
    "creator": {
      "@type": "Person",
      "name": "Cyrus Baptiste"
    },
    "artMedium": artwork.medium,
    "artEdition": artwork.year,
    "image": artwork.image
  }

  return (
    <Layout>
      <Head>
        <title>{artwork.title} — Cyrus Baptiste</title>
        <meta name="description" content={`${artwork.title}${artwork.year ? `, ${artwork.year}` : ''}${artwork.medium ? `. ${artwork.medium}` : ''}.`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${artwork.title} — Cyrus Baptiste`} />
        <meta property="og:description" content={[artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(' · ')} />
        {artwork.image && <meta property="og:image" content={artwork.image} />}
      </Head>

      {/* SEO JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Quick Inquiry Slide Drawer */}
      {isInquiring && (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn" onClick={() => setIsInquiring(false)}>
          <div className="bg-base-100 border-l border-base-content/10 w-full max-w-md p-6 sm:p-8 flex flex-col justify-between overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex justify-between items-center mb-8">
                <p className="font-space text-xs tracking-[0.25em] uppercase text-base-content/40">Adquirir Obra</p>
                <button onClick={() => setIsInquiring(false)} className="text-base-content/50 hover:text-base-content">
                  ✕
                </button>
              </div>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-normal mb-2">{artwork.title}</h3>
              <p className="font-space text-xs text-base-content/50 mb-8">{[artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(' · ')}</p>

              {inquirySent ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded text-sm text-center font-space">
                  ✓ Su consulta ha sido enviada con éxito.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block font-space text-xs tracking-widest uppercase text-base-content/60 mb-1">Nombre</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-base-200 border border-base-content/10 px-4 py-2.5 text-sm focus:outline-none focus:border-base-content"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block font-space text-xs tracking-widest uppercase text-base-content/60 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-base-200 border border-base-content/10 px-4 py-2.5 text-sm focus:outline-none focus:border-base-content"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-space text-xs tracking-widest uppercase text-base-content/60 mb-1">Mensaje</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-base-200 border border-base-content/10 p-4 text-sm focus:outline-none focus:border-base-content"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-space py-3.5 bg-base-content text-base-100 hover:bg-base-content/90 transition-all text-xs tracking-widest uppercase mt-4"
                  >
                    Enviar Consulta
                  </button>
                </form>
              )}
            </div>
            <p className="font-space text-[10px] text-base-content/30 tracking-widest uppercase text-center mt-6">
              Respuesta en menos de 24 horas
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen High-Res Inspector Modal */}
      {isZoomed && artwork.image && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-10"
            onClick={() => setIsZoomed(false)}
            aria-label="Close inspector"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-7xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg select-none"
            />
          </div>

          <div className="mt-4 text-center">
            <p className="font-cormorant text-xl text-white font-medium">{artwork.title}</p>
            <p className="font-space text-xs text-white/60 tracking-widest uppercase mt-1">
              {[artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>
      )}

      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <Link
            href="/gallery"
            className="font-space inline-flex items-center gap-2 text-xs tracking-widest uppercase text-base-content/50 hover:text-base-content transition-colors mb-10 sm:mb-14"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Gallery
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image with zoom badge */}
            <div 
              className="group relative bg-base-200 rounded-2xl overflow-hidden flex items-center justify-center cursor-zoom-in"
              onClick={() => artwork.image && setIsZoomed(true)}
            >
              {artwork.image ? (
                <>
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full object-contain max-h-[75vh] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-space inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] tracking-widest uppercase shadow-lg">
                      Inspeccionar ⊕
                    </span>
                  </div>
                </>
              ) : (
                <div className="aspect-[4/5] w-full flex items-center justify-center">
                  <span className="text-base-content/30">{artwork.title}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-24">
              <p className="font-space text-xs tracking-[0.25em] uppercase text-base-content/40 mb-4">Obra</p>
              <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal mb-10">{artwork.title}</h1>

              <div className="divide-y divide-base-content/10 border-t border-base-content/10">
                {artwork.year && (
                  <div className="flex justify-between py-4">
                    <span className="font-space text-xs tracking-widest uppercase text-base-content/50">Año</span>
                    <span className="font-space text-sm">{artwork.year}</span>
                  </div>
                )}
                {artwork.medium && (
                  <div className="flex justify-between py-4 gap-8">
                    <span className="font-space text-xs tracking-widest uppercase text-base-content/50 shrink-0">Técnica</span>
                    <span className="text-right text-sm">{artwork.medium}</span>
                  </div>
                )}
                {artwork.dimensions && (
                  <div className="flex justify-between py-4">
                    <span className="font-space text-xs tracking-widest uppercase text-base-content/50">Dimensiones</span>
                    <span className="font-space text-sm">{artwork.dimensions}</span>
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsInquiring(true)}
                  className="font-space inline-flex items-center justify-center gap-3 px-6 py-3 bg-base-content text-base-100 hover:bg-base-content/90 transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer"
                >
                  Adquirir Obra / Consultar
                </button>
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
