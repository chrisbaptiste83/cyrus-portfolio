# Cyrus Baptiste Portfolio

A modern, full-stack portfolio and gallery management application for artist Cyrus Baptiste, featuring his personal artwork collection and Arena Negra gallery/art school in Monterrey, Mexico.

![Ruby](https://img.shields.io/badge/Ruby-3.4.2-red)
![Rails](https://img.shields.io/badge/Rails-8.0-red)
![React](https://img.shields.io/badge/React-19-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

This application serves as both a portfolio website and content management system, allowing the artist to:

- Showcase personal artwork with detailed metadata
- Manage Arena Negra gallery content (student work, exhibitions, workshops, events)
- Upload and organize images and videos
- Present a professional, responsive web presence

## Tech Stack

### Backend
- **Ruby 3.4.2** - Latest Ruby version with YJIT enabled
- **Rails 8.0** - Full-stack framework with modern defaults
- **SQLite3** - Database (with Solid Queue, Solid Cache, Solid Cable)
- **Active Storage** - File uploads and attachments
- **Active Admin** - Admin dashboard for content management
- **Devise** - Authentication for admin users

### Frontend
- **React 19** - UI components and interactivity
- **Inertia.js** - Server-driven single-page app experience
- **Tailwind CSS 3** - Utility-first styling
- **DaisyUI 4** - Component library
- **Hotwire (Turbo + Stimulus)** - Progressive enhancement

### Infrastructure
- **Kamal 2** - Docker-based deployment
- **Thruster** - HTTP/2 proxy with auto SSL
- **Propshaft** - Asset pipeline
- **esbuild** - JavaScript bundling

## Getting Started

### Prerequisites

- Ruby 3.4.2 (recommend using rbenv or asdf)
- Node.js 22+ and Yarn
- SQLite3

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisbaptiste83/cyrus-portfolio.git
cd cyrus-portfolio

# Install dependencies
bundle install
yarn install

# Setup database
bin/rails db:setup

# Start the development server
bin/dev
```

The application will be available at `http://localhost:3000`.

### Admin Access

Access the admin panel at `/admin`. Create an admin user via Rails console:

```ruby
AdminUser.create!(email: 'admin@example.com', password: 'password')
```

## Project Structure

```
app/
├── admin/           # Active Admin resources
├── assets/          # Stylesheets and JavaScript
├── controllers/     # Rails controllers
├── javascript/      # React components and Inertia pages
│   ├── Pages/       # Page components (Home, Gallery, ArenaNegra)
│   └── controllers/ # Stimulus controllers
├── models/          # Active Record models
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
- `student_work` - Student projects and creations
- `exhibition` - Gallery exhibitions
- `workshop` - Art workshops and classes
- `event` - Special events

### AdminUser
Devise-authenticated administrators for content management.

## Testing

Run the test suite:

```bash
# Run all tests
bundle exec rspec

# Run with verbose output
bundle exec rspec --format documentation

# Run specific tests
bundle exec rspec spec/models/
bundle exec rspec spec/requests/
```

Coverage reports are generated automatically in the `coverage/` directory.

## Deployment

The application is deployed using Kamal to a Linux server with Docker.

```bash
# Deploy to production
kamal deploy

# View logs
kamal logs

# Access Rails console
kamal console
```

### Environment Variables

Required secrets (managed via `.kamal/secrets`):
- `RAILS_MASTER_KEY` - Rails credentials encryption key
- `KAMAL_REGISTRY_PASSWORD` - Docker registry authentication

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page with artist bio and featured works |
| GET | `/gallery` | Full artwork gallery |
| GET | `/arena-negra` | Arena Negra gallery and art school page |
| GET | `/admin` | Admin dashboard (authenticated) |

## Performance

- **YJIT enabled** for improved Ruby performance
- **Asset fingerprinting** for cache optimization
- **Image optimization** via Active Storage variants
- **Turbo Drive** for fast navigation
- **Docker multi-stage builds** for minimal image size

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cyrus Baptiste](https://www.instagram.com/cyrusbaptiste.artist) - Artist
- [Arena Negra](https://www.instagram.com/arenanegragaleria) - Gallery & Art School
- Built with Rails, React, and Inertia.js
