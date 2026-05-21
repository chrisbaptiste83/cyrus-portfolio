# Cyrus Portfolio (cyrus-portfolio)

Rails 8.0.2 portfolio app. Ruby 3.4.2. SQLite3.

## Stack

- **Frontend**: React + Inertia.js (inertia_rails), esbuild (jsbundling-rails + cssbundling-rails), Tailwind v4 + DaisyUI v5, Hotwire (Turbo + Stimulus)
- **Auth**: Devise
- **Admin**: ActiveAdmin + sass-embedded (for ActiveAdmin SCSS)
- **Background jobs**: Solid Queue
- **Cache**: Solid Cache
- **Deploy**: Kamal + Thruster
- **Testing**: RSpec + Factory Bot + Faker + Shoulda Matchers + SimpleCov + Capybara

## Dev Commands

```bash
bin/dev              # start Rails + esbuild + CSS watchers
bin/rails c
bin/rspec            # or: bundle exec rspec
bin/rails db:migrate
dbreset
rcheck
```

## Architecture — Inertia.js

This app uses **Inertia.js** for the main UI, not ERB views.

- Controllers render with `render inertia: 'PageName', props: { ... }`
- React components in `app/javascript/pages/`
- Root layout is ERB (`app/views/layouts/application.html.erb`) — everything else is React
- **Don't add ERB views for Inertia-managed routes**

## Conventions

- **Tests: RSpec** — factories in `spec/factories/`, Shoulda Matchers for model specs
- SimpleCov for coverage (`coverage/` gitignored)
- Rubocop: `rubocop-rails-omakase`
- **Tailwind v4** — CSS-based config (`@import "tailwindcss"`, no `tailwind.config.js`)
- **DaisyUI v5** via `@plugin "daisyui"` in the CSS entry point
- DaisyUI component classes used throughout React components
- ActiveAdmin at `/admin` — SCSS compiled via sass-embedded

## Notes

- Cleanest branch state in the workspace — good reference for git hygiene
- Migrated from Tailwind v3 → v4 + DaisyUI v4 → v5 (no postcss/autoprefixer needed in v4)
- `package-lock.json` is present — use `npm` not `yarn`
