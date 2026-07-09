import React, { useState, useMemo } from 'react'
import { feature } from 'topojson-client'
import worldData from 'world-atlas/countries-110m.json'

const W = 960
const H = 480

const toX = (lon) => ((lon + 180) / 360) * W
const toY = (lat) => ((90 - lat) / 180) * H

function featureToPath(f) {
  const geom = f.geometry
  if (!geom) return ''
  const polys = geom.type === 'Polygon' ? [geom.coordinates] :
    geom.type === 'MultiPolygon' ? geom.coordinates : []
  return polys.map(poly =>
    poly.map(ring =>
      ring.map(([lon, lat], i) =>
        `${i === 0 ? 'M' : 'L'}${toX(lon).toFixed(1)},${toY(lat).toFixed(1)}`
      ).join(' ') + ' Z'
    ).join(' ')
  ).join(' ')
}

const HOME = { name: 'Monterrey', note: 'Base principal', lat: 25.67, lon: -100.31 }

const MEXICO_CITIES = [
  { name: 'Mexicali', lat: 32.66, lon: -115.47 },
  { name: 'Zacatecas', lat: 22.77, lon: -102.57 },
  { name: 'León', lat: 21.12, lon: -101.69 },
  { name: 'Ciudad de México', lat: 19.43, lon: -99.13 },
  { name: 'Oaxaca', lat: 17.07, lon: -96.72 },
]

const INTERNATIONAL = [
  { name: 'Port of Spain', country: 'Trinidad & Tobago', lat: 10.65, lon: -61.52 },
  { name: 'Bogotá', country: 'Colombia', lat: 4.71, lon: -74.07 },
  { name: 'Madrid', country: 'España', lat: 40.42, lon: -3.70 },
  { name: 'París', country: 'Francia', lat: 48.86, lon: 2.35 },
  { name: 'Roma', country: 'Italia', lat: 41.90, lon: 12.49 },
  { name: 'Nueva Delhi', country: 'India', lat: 28.61, lon: 77.21 },
]

const LAT_TICKS = [60, 30, 0, -30, -60]

function Arc({ x1, y1, x2, y2 }) {
  const cx = (x1 + x2) / 2
  const cy = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.22
  return (
    <path
      d={`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.9}
      strokeDasharray="5 5"
      opacity={0.25}
    />
  )
}

export default function ExhibitionMap() {
  const [hovered, setHovered] = useState(null)

  const landPath = useMemo(() => {
    const features = feature(worldData, worldData.objects.countries).features
    return features.map(featureToPath).join(' ')
  }, [])

  const hx = toX(HOME.lon)
  const hy = toY(HOME.lat)

  const latLines = Array.from({ length: 9 }, (_, i) => -80 + i * 20)
  const lonLines = Array.from({ length: 19 }, (_, i) => -180 + i * 20)

  return (
    <div className="w-full select-none">
      <div className="relative border border-base-content/10 overflow-hidden rounded-sm">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          aria-label="Mapa de exposiciones internacionales de Cyrus Baptiste"
          onClick={() => setHovered(null)}
        >
          {/* Ocean */}
          <rect width={W} height={H} fill="currentColor" fillOpacity={0.04} />

          {/* Grid lines */}
          {latLines.map(lat => (
            <line key={lat}
              x1={0} y1={toY(lat)} x2={W} y2={toY(lat)}
              stroke="currentColor"
              strokeWidth={lat === 0 ? 0.8 : 0.30}
              opacity={lat === 0 ? 0.40 : 0.18}
            />
          ))}
          {lonLines.map(lon => (
            <line key={lon}
              x1={toX(lon)} y1={0} x2={toX(lon)} y2={H}
              stroke="currentColor"
              strokeWidth={lon === 0 ? 0.8 : 0.30}
              opacity={lon === 0 ? 0.40 : 0.18}
            />
          ))}

          {/* Countries — proper Natural Earth shapes */}
          <path
            d={landPath}
            fill="currentColor"
            fillOpacity={0.18}
            stroke="currentColor"
            strokeOpacity={0.45}
            strokeWidth={0.45}
            strokeLinejoin="round"
          />

          {/* Latitude tick labels */}
          {LAT_TICKS.map(lat => (
            <text key={lat}
              x={6} y={toY(lat) + 4}
              fontSize={8}
              fill="currentColor"
              opacity={0.28}
              fontFamily="monospace"
            >
              {lat > 0 ? `${lat}°N` : lat < 0 ? `${Math.abs(lat)}°S` : '0°'}
            </text>
          ))}

          {/* Arcs from Monterrey to international cities */}
          {INTERNATIONAL.map(city => (
            <Arc key={city.name}
              x1={hx} y1={hy}
              x2={toX(city.lon)} y2={toY(city.lat)}
            />
          ))}

          {/* Mexico city dots */}
          {MEXICO_CITIES.map(city => {
            const x = toX(city.lon)
            const y = toY(city.lat)
            const isHov = hovered?.name === city.name
            const toggle = (e) => { e.stopPropagation(); setHovered(isHov ? null : { ...city, x, y }) }
            return (
              <g key={city.name}
                onMouseEnter={() => setHovered({ ...city, x, y })}
                onMouseLeave={() => setHovered(null)}
                onClick={toggle}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={x} cy={y} r={18} fill="transparent" />
                <circle cx={x} cy={y} r={isHov ? 5 : 3.5}
                  fill="currentColor" opacity={isHov ? 0.75 : 0.5}
                  style={{ transition: 'r 0.2s' }}
                />
              </g>
            )
          })}

          {/* International city dots */}
          {INTERNATIONAL.map(city => {
            const x = toX(city.lon)
            const y = toY(city.lat)
            const isHov = hovered?.name === city.name
            const toggle = (e) => { e.stopPropagation(); setHovered(isHov ? null : { ...city, x, y }) }
            return (
              <g key={city.name}
                onMouseEnter={() => setHovered({ ...city, x, y })}
                onMouseLeave={() => setHovered(null)}
                onClick={toggle}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={x} cy={y} r={20} fill="transparent" />
                <circle cx={x} cy={y} r={isHov ? 11 : 8}
                  fill="none" stroke="currentColor" strokeWidth={1}
                  opacity={isHov ? 0.7 : 0.4}
                  style={{ transition: 'r 0.2s' }}
                />
                <circle cx={x} cy={y} r={isHov ? 5.5 : 4}
                  fill="currentColor" opacity={isHov ? 1 : 0.85}
                  style={{ transition: 'r 0.2s' }}
                />
              </g>
            )
          })}

          {/* Home — Monterrey (pulsing) */}
          <g
            onMouseEnter={() => setHovered({ ...HOME, x: hx, y: hy })}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => { e.stopPropagation(); setHovered(hovered?.name === HOME.name ? null : { ...HOME, x: hx, y: hy }) }}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={hx} cy={hy} r={22} fill="transparent" />
            <circle cx={hx} cy={hy} r={8} fill="none" stroke="currentColor" strokeWidth={1.5}>
              <animate attributeName="r" values="8;24;24" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx={hx} cy={hy} r={7} fill="currentColor" opacity={0.9} />
            <circle cx={hx} cy={hy} r={3} fill="currentColor" style={{ mixBlendMode: 'overlay' }} />
          </g>

          {/* Hover tooltip */}
          {hovered && (() => {
            const tipW = 160
            const tipH = hovered.country || hovered.note ? 44 : 28
            const tipX = Math.min(Math.max(hovered.x + 14, 8), W - tipW - 8)
            const tipY = hovered.y < H * 0.75 ? hovered.y - tipH / 2 : hovered.y - tipH - 8
            return (
              <g>
                <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={2}
                  fill="currentColor" opacity={0.92} />
                <text x={tipX + 10} y={tipY + 17}
                  fontSize={12} fontWeight={500}
                  fontFamily="sans-serif"
                  style={{ fill: 'var(--fallback-b1,oklch(var(--b1)))' }}
                >
                  {hovered.name}
                </text>
                {(hovered.country || hovered.note) && (
                  <text x={tipX + 10} y={tipY + 33}
                    fontSize={10}
                    fontFamily="sans-serif"
                    style={{ fill: 'var(--fallback-b1,oklch(var(--b1)))', opacity: 0.6 }}
                  >
                    {hovered.country || hovered.note}
                  </text>
                )}
              </g>
            )
          })()}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-xs text-base-content/45">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="5" fill="currentColor" />
          </svg>
          Monterrey (base)
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="5" fill="currentColor" opacity="0.8" />
            <circle cx="7" cy="7" r="7" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
          Exposición internacional
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="4" fill="currentColor" opacity="0.5" />
          </svg>
          Exposición en México
        </div>
        <div className="flex items-center gap-2">
          <svg width="20" height="4" viewBox="0 0 20 4">
            <line x1="0" y1="2" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5"
              strokeDasharray="4 3" opacity="0.4" />
          </svg>
          Trayecto
        </div>
      </div>
    </div>
  )
}
