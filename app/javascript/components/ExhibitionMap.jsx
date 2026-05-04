import React, { useState } from 'react'

const W = 960
const H = 480

const toX = (lon) => ((lon + 180) / 360) * W
const toY = (lat) => ((90 - lat) / 180) * H

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

const REGION_LABELS = [
  { label: 'NORTEAMÉRICA', lon: -100, lat: 52 },
  { label: 'SUDAMÉRICA', lon: -60, lat: -12 },
  { label: 'EUROPA', lon: 15, lat: 56 },
  { label: 'ÁFRICA', lon: 22, lat: 4 },
  { label: 'ASIA', lon: 90, lat: 44 },
  { label: 'OCEANÍA', lon: 135, lat: -28 },
]

const LAT_TICKS = [60, 30, 0, -30, -60]

// Grid lines at 10° intervals
const latLines = Array.from({ length: 17 }, (_, i) => -80 + i * 10)
const lonLines = Array.from({ length: 36 }, (_, i) => -175 + i * 10)

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
      opacity={0.22}
    />
  )
}

export default function ExhibitionMap() {
  const [hovered, setHovered] = useState(null)
  const hx = toX(HOME.lon)
  const hy = toY(HOME.lat)

  return (
    <div className="w-full select-none">
      <div className="relative border border-base-content/10 bg-base-200/40 overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          aria-label="Mapa de exposiciones internacionales de Cyrus Baptiste"
        >
          {/* Fine grid (every 10°) */}
          {latLines.map(lat => {
            const y = toY(lat)
            const major = lat % 30 === 0
            return (
              <line key={`lat-${lat}`}
                x1={0} y1={y} x2={W} y2={y}
                stroke="currentColor"
                strokeWidth={lat === 0 ? 0.8 : major ? 0.45 : 0.18}
                opacity={lat === 0 ? 0.3 : major ? 0.18 : 0.08}
              />
            )
          })}
          {lonLines.map(lon => {
            const x = toX(lon)
            const major = lon % 30 === 0
            return (
              <line key={`lon-${lon}`}
                x1={x} y1={0} x2={x} y2={H}
                stroke="currentColor"
                strokeWidth={lon === 0 ? 0.8 : major ? 0.45 : 0.18}
                opacity={lon === 0 ? 0.3 : major ? 0.18 : 0.08}
              />
            )
          })}

          {/* Latitude tick labels */}
          {LAT_TICKS.map(lat => (
            <text key={`tick-${lat}`}
              x={6} y={toY(lat) + 4}
              fontSize={9}
              fill="currentColor"
              opacity={0.3}
              fontFamily="monospace"
              letterSpacing={0}
            >
              {lat > 0 ? `${lat}°N` : lat < 0 ? `${Math.abs(lat)}°S` : '0°'}
            </text>
          ))}

          {/* Region background labels */}
          {REGION_LABELS.map(r => (
            <text key={r.label}
              x={toX(r.lon)} y={toY(r.lat)}
              textAnchor="middle"
              fontSize={9}
              letterSpacing={2.5}
              fill="currentColor"
              opacity={0.12}
              fontFamily="sans-serif"
            >
              {r.label}
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
            return (
              <g key={city.name}
                onMouseEnter={() => setHovered({ ...city, x, y })}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}
              >
                <circle cx={x} cy={y} r={18} fill="transparent" />
                <circle cx={x} cy={y} r={isHov ? 5 : 3.5}
                  fill="currentColor" opacity={isHov ? 0.65 : 0.45}
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
            return (
              <g key={city.name}
                onMouseEnter={() => setHovered({ ...city, x, y })}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}
              >
                <circle cx={x} cy={y} r={20} fill="transparent" />
                <circle cx={x} cy={y} r={isHov ? 11 : 8}
                  fill="none" stroke="currentColor" strokeWidth={1}
                  opacity={isHov ? 0.6 : 0.35}
                  style={{ transition: 'r 0.2s' }}
                />
                <circle cx={x} cy={y} r={isHov ? 5.5 : 4}
                  fill="currentColor" opacity={isHov ? 1 : 0.8}
                  style={{ transition: 'r 0.2s' }}
                />
              </g>
            )
          })}

          {/* Home — Monterrey (pulsing) */}
          <g
            onMouseEnter={() => setHovered({ ...HOME, x: hx, y: hy })}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'default' }}
          >
            <circle cx={hx} cy={hy} r={22} fill="transparent" />
            {/* SVG-native pulse ring */}
            <circle cx={hx} cy={hy} r={8} fill="none" stroke="currentColor" strokeWidth={1.5}>
              <animate attributeName="r" values="8;24;24" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx={hx} cy={hy} r={7} fill="currentColor" opacity={0.9} />
            <circle cx={hx} cy={hy} r={3} fill="currentColor"
              style={{ mixBlendMode: 'overlay' }}
            />
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
                  fill="currentColor" className="text-base-100"
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
            <circle cx="7" cy="7" r="4" fill="currentColor" opacity="0.45" />
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
