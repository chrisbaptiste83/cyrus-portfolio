# Cyrus Baptiste Portfolio

A modern, full-stack portfolio and gallery management application for artist Cyrus Baptiste, featuring his personal artwork collection and Arena Negra gallery/art school in Monterrey, Mexico.

[![Ruby](https://img.shields.io/badge/Ruby-3.4.2-CC342D?logo=ruby&logoColor=white)](https://ruby-lang.org)
[![Rails](https://img.shields.io/badge/Rails-8.0.2-CC0000?logo=rubyonrails&logoColor=white)](https://rubyonrails.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://postgresql.org)

Live at [cyrusbaptiste.com](https://cyrusbaptiste.com).

---

## Overview

This application serves as both a portfolio website and content management system for artist Cyrus Baptiste, with:

- Full artwork gallery with individual pages and social sharing meta tags
- Arena Negra gallery/art school with categorized media (images + videos)
- Bio/CV page with exhibition history
- Contact form with email delivery
- Theme switcher (dark/light)
- Admin dashboard for content management
- Zero-downtime production deployment to GCP Cloud Run via GitLab CI

---

## Tech Stack

### Backend

| | |
|---|---|
| Ruby 3.4.2 | Latest Ruby, YJIT enabled |
| Rails 8.0.2 | Full-stack framework |
| PostgreSQL 16 | Primary database |
| Active Storage | File uploads + image variants via libvips |
| image_processing 1.x | Image thumbnails and resizing |
| ActiveAdmin | Admin dashboard |
| Devise | Admin authentication |
| Action Mailer | Contact form email delivery |
| Solid Queue | Background job processing |

### Frontend

| | |
|---|---|
| React 19 | UI components |
| Inertia.js 2.x | Server-driven SPA (no API layer needed) |
| Tailwind CSS 3 | Utility-first styling |
| DaisyUI 4 | Component themes (`black` default, `light` toggle) |
| esbuild | JavaScript bundling |

### Infrastructure

| | |
|---|---|
| GCP Cloud Run | Serverless container deployment via GitLab CI |
| Thruster | HTTP/2 asset proxy |
| Propshaft | Asset pipeline |
| Let's Encrypt | Auto SSL via Kamal proxy |
| Cloudflare | CDN (Full SSL mode) |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, selected works grid, bio, Arena Negra CTA, contact CTA |
| `/gallery` | Gallery | Full artwork grid with lightbox modal + "View full page" links |
| `/gallery/:id` | ArtworkShow | Individual artwork with full metadata, prev/next nav, OG tags |
| `/arena-negra` | ArenaNegra | Gallery/school with masonry media grid and artwork marquee |
| `/bio` | Bio | Artist statement, exhibitions, techniques, Arena Negra section |
| `/contact` | Contact | Contact form (name, email, message) → Action Mailer |
| `/admin` | ActiveAdmin | Content management (authenticated) |

---

## Getting Started

### Prerequisites

- Ruby 3.4.2 (via `rbenv` — see `.ruby-version`)
- Node.js 22+ and Yarn
- PostgreSQL 14+
- libvips (for image processing — `sudo pacman -S libvips` on Arch, `brew install vips` on macOS)

### Installation

```bash
git clone git@github.com:chrisbaptiste83/cyrus-portfolio.git
cd cyrus-portfolio

bundle install
yarn install

bin/rails db:create db:migrate db:seed
bin/dev
```

The application runs at `http://localhost:3000`.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RAILS_MASTER_KEY` | Yes | Decrypts `config/credentials.yml.enc` |
| `DATABASE_URL` | Production | Full PostgreSQL connection URL |
| `KAMAL_REGISTRY_PASSWORD` | Deploy | Docker Hub access token |
| `SMTP_USERNAME` | Production | SMTP account username (Gmail address) |
| `SMTP_PASSWORD` | Production | SMTP app password |
| `POSTGRES_PASSWORD` | Production | PostgreSQL container password |

Development mail is set to `:test` — emails are not sent, only captured in `ActionMailer::Base.deliveries`.

### Admin Access

The admin panel is at `/admin`. The default seed creates `admin@example.com` / `password` — change this immediately in production.

```ruby
# Rails console
AdminUser.first.update!(email: "you@example.com", password: "strongpassword")
```

---

## Project Structure

```
app/
├── admin/
│   ├── artworks.rb         # CRUD for portfolio paintings
│   └── gallery_media.rb    # CRUD for Arena Negra media
├── controllers/
│   └── pages_controller.rb # All public pages + ARTIST_DATA constant
├── javascript/
│   ├── app.jsx             # Inertia bootstrap with explicit page map
│   └── Pages/
│       ├── Layout.jsx      # Shared nav, footer, flash, theme switcher
│       ├── Home.jsx
│       ├── Gallery.jsx
│       ├── ArtworkShow.jsx
│       ├── ArenaNegra.jsx
│       ├── Bio.jsx
│       └── Contact.jsx
├── mailers/
│   └── contact_mailer.rb   # Contact form → email to artist
├── models/
│   ├── artwork.rb          # Portfolio paintings (has_one_attached :image)
│   ├── gallery_media.rb    # Arena Negra media (image + video, categorized)
│   └── admin_user.rb
└── views/
    ├── contact_mailer/     # HTML + text email templates
    ├── layouts/
    │   └── application.html.erb
    └── pwa/
        └── manifest.json.erb

config/
├── deploy.yml              # Kamal 2: server, registry, accessories, secrets
├── routes.rb
└── environments/
    ├── production.rb       # SMTP config via env vars
    └── development.rb      # Mail delivery: :test

db/
├── migrate/
└── seeds.rb                # Artworks from public/images, Arena Negra media from ../Arena Negra folder
```

---

## Models

### Artwork

| Column | Type | Notes |
|---|---|---|
| title | string | required |
| year | string | |
| medium | text | |
| dimensions | string | |
| position | integer | display order |
| image | ActiveStorage | required — variants served as 800×1000 thumbnails |

### GalleryMedia

| Column | Type | Notes |
|---|---|---|
| title | string | required |
| description | text | |
| category | enum | `student_work`, `exhibition`, `event`, `workshop` |
| media_type | enum | `image`, `video` |
| credit | string | optional attribution |
| position | integer | display order |
| file | ActiveStorage | required — images served as 800×800 thumbnails |

---

## Testing

```bash
bundle exec rspec                         # full suite
bundle exec rspec --format documentation  # verbose output
bundle exec rspec spec/models/
bundle exec rspec spec/requests/
```

Coverage reports output to `coverage/`.

---

## Deployment

```bash
bin/kamal setup    # first deploy — provisions server, starts containers
bin/kamal deploy   # zero-downtime rolling deploy (runs db:migrate automatically)
bin/kamal logs     # tail production logs
bin/kamal console  # Rails console in production container
bin/kamal shell    # bash in production container
```

### Production checklist

Before first deploy:

1. Add secrets to `.kamal/secrets`:
   ```
   KAMAL_REGISTRY_PASSWORD=...
   RAILS_MASTER_KEY=...
   DATABASE_URL=...
   POSTGRES_PASSWORD=...
   SMTP_USERNAME=...
   SMTP_PASSWORD=...
   ```
2. Point DNS to the server IP (`172.236.254.205`)
3. Set Cloudflare SSL mode to **Full**
4. Run `bin/kamal setup`

Subsequent deploys: `bin/kamal deploy`

---

## Acknowledgments

- [Cyrus Baptiste](https://www.instagram.com/cyrusbaptiste.artist) — Artist
- [Arena Negra](https://www.instagram.com/arenanegragaleria) — Gallery & Art School, Semillero Purísima, Monterrey
