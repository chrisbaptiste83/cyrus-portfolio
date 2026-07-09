import React, { useState, useEffect, useRef, useCallback } from 'react'
import Layout from './Layout'
import { Head, Link } from '@inertiajs/react'
import MuxPlayerReact from '@mux/mux-player-react'

const CATEGORIES = [
  { key: 'all',          label: 'Todo' },
  { key: 'student_work', label: 'Estudiantes' },
  { key: 'exhibitions',  label: 'Exposiciones' },
  { key: 'workshops',    label: 'Talleres' },
  { key: 'events',       label: 'Eventos' },
]

// ---------------------------------------------------------------------------
// PlayIcon — cinematic play button overlay
// ---------------------------------------------------------------------------
function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center
                      group-hover:scale-110 group-hover:bg-black/80 transition-all duration-300 shadow-xl">
        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MuxPlayer — embeds Mux HLS player when mux_playback_id is available,
//             falls back to plain <video> for legacy GCS uploads
// ---------------------------------------------------------------------------
function MuxPlayer({ item, autoPlay = false, className = '' }) {
  if (item.mux_playback_id) {
    return (
      <MuxPlayerReact
        playbackId={item.mux_playback_id}
        streamType="on-demand"
        autoPlay={autoPlay}
        preload="none"
        className={className}
        style={{ '--controls-backdrop-color': 'rgba(0,0,0,0.6)' }}
      />
    )
  }

  // Legacy fallback: raw GCS file
  return (
    <video
      className={className}
      controls
      playsInline
      preload="metadata"
      src={item.file_url}
    />
  )
}

// ---------------------------------------------------------------------------
// VideoThumbnail — poster frame for grid cards
// Shows Mux thumbnail image if available, black placeholder otherwise
// ---------------------------------------------------------------------------
function VideoThumbnail({ item }) {
  if (item.mux_playback_id) {
    return (
      <img
        src={`https://image.mux.com/${item.mux_playback_id}/thumbnail.jpg?width=600&fit_mode=preserve&time=2`}
        alt={item.title}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
        loading="lazy"
      />
    )
  }
  // No Mux yet — dark gradient placeholder with film-strip feel
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
      <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MediaCard — single item in the masonry grid
// ---------------------------------------------------------------------------
function MediaCard({ item, onOpen }) {
  const isVideo = item.media_type === 'video'

  return (
    <div
      className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer"
      onClick={() => onOpen(item)}
    >
      <div className="relative overflow-hidden rounded-lg bg-base-200">

        {isVideo ? (
          <>
            <VideoThumbnail item={item} />
            <PlayIcon />
            {/* Duration badge placeholder */}
            <div className="absolute top-2 left-2">
              <span className="text-[10px] tracking-widest uppercase bg-black/60 text-white/70 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                Video
              </span>
            </div>
          </>
        ) : (
          <>
            <img
              src={item.thumbnail_url || item.file_url}
              alt={item.title}
              className="w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
              loading="lazy"
            />
            {/* Hover frosted pill badge */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 transform">
                <span className="font-space inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 text-xs tracking-widest uppercase shadow-xl font-medium">
                  Ampliar
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </span>
              </div>
            </div>
          </>
        )}

        {/* Credit badge */}
        {item.credit && (
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-[11px] text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded truncate">
              {item.credit}
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// Lightbox — handles both images and videos
// ---------------------------------------------------------------------------
function Lightbox({ item, onClose }) {
  const isVideo = item.media_type === 'video'

  // Close on backdrop click or Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Media */}
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <MuxPlayer
            item={item}
            autoPlay
            className="w-full rounded-lg shadow-2xl bg-black aspect-video"
          />
        ) : (
          <img
            src={item.file_url}
            alt={item.title}
            className="max-w-full max-h-[85vh] object-contain mx-auto rounded-lg shadow-2xl"
          />
        )}

        {/* Caption */}
        {(item.credit || item.description) && (
          <div className="mt-4 text-center space-y-1">
            {item.credit && (
              <p className="text-white/50 text-xs">Por: {item.credit}</p>
            )}
            {item.description && (
              <p className="text-white/40 text-xs max-w-lg mx-auto leading-relaxed">{item.description}</p>
            )}
          </div>
        )}
      </div>

      {/* ESC hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest uppercase">
        ESC para cerrar
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function ArenaNegra({ artworks, gallery_media, gallery_info, instagram_gallery }) {
  const [selectedMedia, setSelectedMedia]   = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')

  const handleOpen  = useCallback((item) => setSelectedMedia(item), [])
  const handleClose = useCallback(() => setSelectedMedia(null), [])

  // Tag each item with its category key
  const taggedMedia = [
    ...(gallery_media?.student_work || []).map(m => ({ ...m, category: 'student_work' })),
    ...(gallery_media?.exhibitions  || []).map(m => ({ ...m, category: 'exhibitions' })),
    ...(gallery_media?.workshops    || []).map(m => ({ ...m, category: 'workshops' })),
    ...(gallery_media?.events       || []).map(m => ({ ...m, category: 'events' })),
  ]

  const filteredMedia = filterCategory === 'all'
    ? taggedMedia
    : taggedMedia.filter(m => m.category === filterCategory)

  const availableCategories = CATEGORIES.filter(cat =>
    cat.key === 'all' || taggedMedia.some(m => m.category === cat.key)
  )

  const arenaImages  = taggedMedia.filter(m => m.media_type === 'image').slice(0, 3)
  const studentImgs  = taggedMedia.filter(m => m.media_type === 'image' && m.category === 'student_work')
  const heroImage    = studentImgs[0]?.file_url || arenaImages[0]?.file_url || artworks?.[0]?.image || null

  const showcaseItems = [
    arenaImages[0]  && { type: 'arena',   ...arenaImages[0] },
    artworks?.[0] && { type: 'artwork',  ...artworks[0] },
    arenaImages[1]  && { type: 'arena',   ...arenaImages[1] },
    artworks?.[1] && { type: 'artwork',  ...artworks[1] },
    arenaImages[2]  && { type: 'arena',   ...arenaImages[2] },
  ].filter(Boolean)

  // Count videos so we can show a stat
  const videoCount = taggedMedia.filter(m => m.media_type === 'video').length

  return (
    <Layout>
      <Head>
        <title>Arena Negra — Cyrus Baptiste</title>
        <meta name="description" content="Arena Negra — galería y escuela de arte independiente en el Semillero Purísima, centro de Monterrey. Fundada por Cyrus Baptiste en 2024." />
        <meta property="og:title" content="Arena Negra — Galería & Escuela de Arte" />
        <meta property="og:description" content="Un espacio independiente para el arte en el corazón de Monterrey. Galería, talleres y clases de arte." />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ArtGallery",
        "name": "Arena Negra",
        "founder": {
          "@type": "Person",
          "name": "Cyrus Baptiste"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Semillero Purísima",
          "addressLocality": "Monterrey",
          "addressRegion": "Nuevo León",
          "addressCountry": "MX"
        },
        "description": "Galería y escuela de arte independiente en el centro de Monterrey."
      }) }} />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-black">
        {heroImage && (
          <div className="absolute inset-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover opacity-50"
                 style={{ objectPosition: '50% 25%' }} aria-hidden="true" loading="eager" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />

        <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 lg:px-10 pt-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/25">Arena Negra</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">Est. 2024 · Monterrey, MX</p>
          </div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-white/40" />
              <p className="font-space text-xs tracking-[0.35em] uppercase text-white/50">Galería &amp; Escuela de Arte</p>
            </div>
            <h1 className="font-cormorant text-6xl sm:text-8xl md:text-9xl font-normal tracking-tight text-white leading-[0.88] mb-8">
              Arena<br /><span className="italic">Negra</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xs sm:max-w-sm mb-10 leading-relaxed">
              Un espacio independiente para el arte en el corazón de Monterrey
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href={instagram_gallery} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @arenanegragaleria
              </a>
              <Link href="/gallery"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors text-sm">
                Ver Galería del Artista
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 sm:right-10 flex flex-col items-center gap-3 text-white/25">
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="w-px h-10 bg-white/20 animate-bounce" />
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-3 border-y border-base-content/8 bg-base-200/50 select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex-shrink-0 text-[10px] tracking-[0.3em] uppercase text-base-content/35 mx-10">
              · Galería de Arte · Escuela de Arte · Semillero Purísima · Monterrey · 2024 · Arena Negra ·
            </span>
          ))}
        </div>
      </div>

      {/* ── About + showcase ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-4">Sobre Nosotros</p>
              <h2 className="text-3xl sm:text-4xl font-light mb-8">Un Espacio Para el Arte</h2>
              <div className="space-y-6 text-base-content/70 leading-relaxed">
                <p className="text-lg">{gallery_info}</p>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-base-content/10">
                <div><p className="text-3xl font-light">2024</p><p className="text-sm text-base-content/50 mt-1">Fundado</p></div>
                <div><p className="text-3xl font-light">MTY</p><p className="text-sm text-base-content/50 mt-1">Ubicación</p></div>
                {videoCount > 0
                  ? <div><p className="text-3xl font-light">{videoCount}</p><p className="text-sm text-base-content/50 mt-1">Videos</p></div>
                  : <div><p className="text-3xl font-light">&infin;</p><p className="text-sm text-base-content/50 mt-1">Creatividad</p></div>
                }
              </div>
            </div>

            {/* Image showcase grid — unchanged layout */}
            <div className="relative">
              <div className="grid grid-cols-6 grid-rows-4 gap-1.5 sm:gap-3 h-[240px] sm:h-[400px] lg:h-[500px]">
                {showcaseItems[0] && (
                  <div className="col-span-4 row-span-3 group relative overflow-hidden rounded-xl cursor-pointer"
                       onClick={() => showcaseItems[0].type === 'arena' && handleOpen(showcaseItems[0])}>
                    <img src={showcaseItems[0].file_url || showcaseItems[0].image} alt={showcaseItems[0].title}
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">{showcaseItems[0].title}</p>
                        {showcaseItems[0].credit && <p className="text-white/60 text-xs">Por: {showcaseItems[0].credit}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {[1,2,3,4].map(i => showcaseItems[i] && (
                  <div key={i}
                       className={`${i <= 2 ? 'col-span-2 row-span-2' : 'col-span-2 row-span-1'} group relative overflow-hidden rounded-xl cursor-pointer`}
                       onClick={() => showcaseItems[i].type === 'arena' && handleOpen(showcaseItems[i])}>
                    <img src={showcaseItems[i].file_url || showcaseItems[i].image} alt={showcaseItems[i].title}
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-base-content/10 rounded-lg -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-base-content/10 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Media Grid ── */}
      {taggedMedia.length > 0 && (
        <section className="bg-base-200/30 py-16 sm:py-20 lg:py-24">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <div className="text-center mb-8">
                  <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-4">Nuestra Comunidad</p>
                  <h2 className="text-3xl sm:text-4xl font-light">Galería del Estudio</h2>
                  {videoCount > 0 && (
                    <p className="text-sm text-base-content/40 mt-2">
                      {videoCount} video{videoCount !== 1 ? 's' : ''} · Click para reproducir
                    </p>
                  )}
                </div>

                {availableCategories.length > 1 && (
                  <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
                    {availableCategories.map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => setFilterCategory(cat.key)}
                        className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-200 border ${
                          filterCategory === cat.key
                            ? 'bg-base-content text-base-100 border-base-content'
                            : 'border-base-content/20 text-base-content/50 hover:border-base-content/50 hover:text-base-content/80'
                        }`}
                      >
                        {cat.label}
                        {cat.key !== 'all' && (
                          <span className="ml-2 opacity-60">
                            {taggedMedia.filter(m => m.category === cat.key).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Masonry grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
                {filteredMedia.map((item) => (
                  <MediaCard key={item.id} item={item} onOpen={handleOpen} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Artwork marquee strip ── */}
      <section className="py-16 sm:py-20 overflow-hidden">
        <div className="mb-8 px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-base-content/40 mb-2">Obras Destacadas</p>
              <h2 className="text-2xl sm:text-3xl font-light">Del Artista</h2>
            </div>
            <Link href="/gallery" className="text-sm text-base-content/50 hover:text-base-content transition-colors">Ver todas</Link>
          </div>
        </div>
        <div className="relative px-4 sm:px-0">
          <div className="flex gap-4 sm:gap-6 animate-marquee hover:pause">
            {[...(artworks || []), ...(artworks || [])].map((artwork, index) => (
              <Link key={`${artwork.id}-${index}`} href={`/gallery/${artwork.id}`} className="flex-shrink-0 group">
                <div className="w-48 sm:w-64 md:w-72 aspect-[4/5] overflow-hidden rounded-lg sm:rounded-xl bg-base-200">
                  <img src={artwork.image} alt={artwork.title}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
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

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 bg-base-content text-base-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-base-100/50 mb-4">Visítanos</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">Semillero Purísima, Monterrey</h2>
          <p className="text-base-100/60 mb-10 max-w-2xl mx-auto">
            Ven a conocer nuestro espacio, tomar una clase de arte, o simplemente disfrutar de las exposiciones actuales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={instagram_gallery} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-8 py-4 bg-base-100 text-base-content hover:bg-base-100/90 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Síguenos en Instagram
            </a>
            <Link href="/bio" className="inline-flex items-center gap-3 px-8 py-4 border border-base-100/30 hover:bg-base-100/10 transition-colors">
              Conoce al Artista
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {selectedMedia && <Lightbox item={selectedMedia} onClose={handleClose} />}
    </Layout>
  )
}
