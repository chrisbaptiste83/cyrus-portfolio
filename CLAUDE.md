# Cyrus Portfolio (cyrus-portfolio)

Rails 8.0.2 portfolio app for Cyrus Baptiste. Ruby 3.4.2. PostgreSQL (Cloud SQL).

## Stack

- **Frontend**: React + Inertia.js (inertia_rails), esbuild (jsbundling-rails + cssbundling-rails), Tailwind v4 + DaisyUI v5
- **Database**: PostgreSQL via Cloud SQL (private IP: 10.168.0.3, us-west2)
- **Storage**: Active Storage → Google Cloud Storage (`cyrus-portfolio-prod-bucket`, us-west2) with Workload Identity (`iam: true`)
- **Media CDN**: ImageKit (`https://ik.imagekit.io/ja0efuulc`) — artwork images uploaded **directly to ImageKit** (not via GCS proxy)
- **Video**: Mux (`mux_playback_id` → `https://stream.mux.com/{id}.m3u8`; thumbnail from `image.mux.com`)
- **Background jobs**: Solid Queue
- **Cache**: Solid Cache
- **Auth**: Devise / ActiveAdmin
- **Deploy**: Docker → Artifact Registry → Cloud Run (GitLab CI pipeline, NOT Kamal)
- **Testing**: RSpec + Factory Bot + Faker + Shoulda Matchers + SimpleCov + Capybara

## Dev Commands

```bash
bin/dev              # start Rails + esbuild + CSS watchers
bin/rails c
bin/rspec
bin/rails db:migrate
```

## Deployment Architecture

**Pipeline**: GitLab CI (`.gitlab-ci.yml`) — stages: test → build → deploy

- **Image registry**: `us-west2-docker.pkg.dev/gcp-dev-sandbox-495101/app-images/cyrus-portfolio`
- **Cloud Run service**: `cyrus-portfolio`, region `us-west2`, project `gcp-dev-sandbox-495101`
- **min-instances=1** — required; Cloud Run is behind a GCP Global Load Balancer whose backend timeout is 30s; cold starts take ~4 min and will cause 502s
- **VPC connector**: `cyrus-portfolio-connector` — required for Cloud Run to reach Cloud SQL private IP
- **Load balancer**: IP `34.107.171.159`, serving `www.cyrusbaptiste.com` via SSL cert (active through Aug 2026)
- **Serverless NEG**: `cyrus-portfolio-neg` routes LB → Cloud Run

**Secrets** (from GCP Secret Manager, mounted via Cloud Run `--set-secrets`):
- `DATABASE_URL` — Cloud SQL connection string
- `RAILS_MASTER_KEY` — Rails credentials key
- `IMAGEKIT_ENDPOINT` — `https://ik.imagekit.io/ja0efuulc`
- `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_PUBLIC_KEY` — ImageKit API keys

**One-off jobs**: Cloud Run Job `cyrus-seed` with VPC connector + same secrets — used to run `db:seed` in production.

## Image/Media Pipeline

### Artwork images
- Uploaded **directly to ImageKit** using GCS blob keys as filenames
- `imagekit_url(attachment)` generates CDN URLs with on-the-fly transforms
- Static fallback: `/images/{filename}` when ImageKit URL is nil and blob is attached
- `ArtworkSerializer` in `app/models/artwork_serializer.rb` handles URL construction

### Gallery media
- Videos: Mux HLS (`stream.mux.com/{mux_playback_id}.m3u8`)
- Images: ImageKit CDN via `GalleryMediaSerializer`

### ImageKit configuration note
**This project uploads artwork directly to ImageKit** (not as a GCS-origin proxy). The `IMAGEKIT_ENDPOINT` env var points to the ImageKit folder URL. Do **not** change this to a bucket-proxy approach — it will break image serving.

Other projects in this stack may use ImageKit as a GCS bucket proxy (different architecture).

## Theme System

- **DaisyUI themes**: `black` (dark default) and `lofi` (light)
- Configured in `app/assets/stylesheets/application.tailwind.css`:
  ```css
  @plugin "daisyui" {
    themes: black, lofi;
  }
  ```
  DaisyUI v5 only emits `light` and `dark` by default — explicit theme list is **required** or theme switching does nothing.
- Theme stored in `localStorage` as `"black"` or `"lofi"`
- Inline `<script>` in `<head>` of `application.html.erb` applies theme before first paint (prevents flash)
- Legacy `"light"` key in localStorage is mapped to `"lofi"` by the inline script

## Architecture — Inertia.js

- Controllers render with `render inertia: 'PageName', props: { ... }`
- React components in `app/javascript/Pages/`
- Root layout is ERB (`app/views/layouts/application.html.erb`) — everything else is React
- **Don't add ERB views for Inertia-managed routes**

## Conventions

- **Tests**: RSpec — factories in `spec/factories/`, Shoulda Matchers for model specs
- Rubocop: `rubocop-rails-omakase`
- **Tailwind v4** — CSS-based config (`@import "tailwindcss"`, no `tailwind.config.js`)
- DaisyUI component classes used throughout React components
- `package-lock.json` is present — use `npm` not `yarn`
- Migrations must be idempotent — Solid Queue migration uses `return if connection.table_exists?(:solid_queue_jobs)`

## DO NOT Change in Audits

- **Image serving architecture** — artwork images go through ImageKit direct-upload, not GCS proxy. Do not change `imagekit_url` behavior or move images to a different CDN approach.
- **`min-instances=1`** on the Cloud Run service — removing this causes 502s behind the LB.
- **VPC connector** on both the Cloud Run service and `cyrus-seed` job — required for DB access.
- **DaisyUI theme list** in the CSS entry point — removing `themes: black, lofi` breaks dark/light mode entirely.
- **`IMAGEKIT_ENDPOINT`** secret in Cloud Run — without it, all artwork images return nil.
