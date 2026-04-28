# Cyrus Baptiste Portfolio

A modern, full-stack portfolio and gallery management application for artist Cyrus Baptiste, featuring his personal artwork collection and Arena Negra gallery/art school in Monterrey, Mexico.

[![Ruby](https://img.shields.io/badge/Ruby-3.4.2-CC342D?logo=ruby&logoColor=white)](https://ruby-lang.org)
[![Rails](https://img.shields.io/badge/Rails-8.0.2-CC0000?logo=rubyonrails&logoColor=white)](https://rubyonrails.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Live at [cyrusbaptiste.com](https://cyrusbaptiste.com).

## Overview

This application serves as both a portfolio website and content management system, allowing the artist to:

- Showcase personal artwork with detailed metadata
- Manage Arena Negra gallery content (student work, exhibitions, workshops, events)
- Upload and organize images and videos
- Present a professional, responsive web presence

## Tech Stack

### Backend

- **Ruby 3.4.2** — Latest Ruby with YJIT enabled for improved throughput
- **Rails 8.0.2** — Full-stack framework with modern defaults
- **PostgreSQL 16** — Primary database
- **Active Storage** — File uploads and attachments
- **ActiveAdmin** — Admin dashboard for content management
- **Devise** — Authentication for admin users

### Frontend

- **React 19** — UI components and interactivity
- **Inertia.js** — Server-driven single-page app experience
- **Tailwind CSS 3** — Utility-first styling
- **DaisyUI 4** — Component library
- **Hotwire (Turbo + Stimulus)** — Progressive enhancement

### Infrastructure

- **Kamal 2** — Docker-based zero-downtime deployment
- **Thruster** — HTTP/2 proxy with auto SSL
- **Propshaft** — Modern asset pipeline
- **esbuild** — JavaScript bundling

## Getting Started

### Prerequisites

- Ruby 3.4.2 (use `rbenv` — see `.ruby-version`)
- Node.js 22+ and Yarn
- PostgreSQL 14+

### Installation

```bash
git clone git@github.com:chrisbaptiste83/cyrus-portfolio.git
cd cyrus-portfolio

bundle install
yarn install

bin/rails db:create db:migrate db:seed
bin/dev
```

The application will be available at `http://localhost:3000`.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RAILS_MASTER_KEY` | Yes | Decrypts `config/credentials.yml.enc` |
| `KAMAL_REGISTRY_PASSWORD` | Deploy | Docker registry token |
| `PGUSER` | No | PostgreSQL user (default: `chris`) |
| `PGPASSWORD` | No | PostgreSQL password |
| `PGHOST` | No | PostgreSQL host (default: `localhost`) |
| `DATABASE_URL` | Production | Full PostgreSQL connection URL |

### Admin Access

Access the admin panel at `/admin`. Create an admin user via the Rails console:

```ruby
AdminUser.create!(email: "admin@example.com", password: "changeme123")
```

## Project Structure

```
app/
├── admin/           # ActiveAdmin resources (artworks, gallery_media)
├── assets/          # Stylesheets and JavaScript
├── controllers/     # Rails controllers
├── javascript/      # React components and Inertia pages
│   ├── Pages/       # Page components (Home, Gallery, ArenaNegra)
│   └── controllers/ # Stimulus controllers
├── models/          # ActiveRecord models
└── views/           # ERB templates and layouts

config/
├── deploy.yml       # Kamal deployment configuration
└── routes.rb        # Application routes

db/
├── migrate/         # Database migrations
└── seeds.rb         # Seed data
```

## Models

### Artwork

Personal artwork pieces with title, year, medium, dimensions, and attached image.

### GalleryMedia

Arena Negra gallery content supporting both images and videos with categories:

| Category | Description |
|---|---|
| `student_work` | Student projects and creations |
| `exhibition` | Gallery exhibitions |
| `workshop` | Art workshops and classes |
| `event` | Special events |

### AdminUser

Devise-authenticated administrators for content management.

## Testing

```bash
bundle exec rspec                         # full suite
bundle exec rspec --format documentation  # verbose output
bundle exec rspec spec/models/            # model specs only
bundle exec rspec spec/requests/          # request specs only
```

Coverage reports are generated automatically in the `coverage/` directory.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/` | Home page with artist bio and featured works |
| GET | `/gallery` | Full artwork gallery |
| GET | `/arena-negra` | Arena Negra gallery and art school page |
| GET | `/admin` | Admin dashboard (authenticated) |

## Performance

- **YJIT enabled** — Improved Ruby runtime performance
- **Asset fingerprinting** — Long-lived cache headers for static assets
- **Image optimization** — Active Storage variants for responsive images
- **Turbo Drive** — Fast navigation without full-page reloads
- **Docker multi-stage builds** — Minimal production image size

## Deployment

Deployed via [Kamal 2](https://kamal-deploy.org) to `cyrusbaptiste.com`:

```bash
kamal setup    # first deploy — provisions server and starts containers
kamal deploy   # zero-downtime rolling deploy
kamal logs     # tail production logs
kamal console  # open Rails console in production
```

## License

MIT — see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Cyrus Baptiste](https://www.instagram.com/cyrusbaptiste.artist) — Artist
- [Arena Negra](https://www.instagram.com/arenanegragaleria) — Gallery & Art School
