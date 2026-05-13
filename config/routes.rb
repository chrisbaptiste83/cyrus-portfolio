Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :admin_users, controllers: { sessions: "admin_users/sessions" }

  root "pages#home"
  get "gallery",       to: "pages#gallery"
  get "gallery/:id",   to: "pages#artwork",    as: :artwork
  get "arena-negra",   to: "pages#arena_negra"
  get "bio",           to: "pages#bio"
  get "contact",       to: "pages#contact"
  post "contact",      to: "pages#send_message"

  get "up" => "rails/health#show", as: :rails_health_check

  # Mux webhook — register this URL in your Mux dashboard
  post "mux/webhook", to: "mux_webhooks#receive"

  get "manifest"       => "rails/pwa#manifest",       as: :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end