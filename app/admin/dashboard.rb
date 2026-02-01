# frozen_string_literal: true
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Portfolio Overview", class: "overview-panel" do
          div class: "stats-grid" do
            div class: "stat-card" do
              h3 Artwork.count.to_s
              span "Artworks"
            end
            div class: "stat-card" do
              h3 Video.count.to_s
              span "Videos"
            end
          end
        end
      end
    end

    columns do
      column do
        panel "Recent Artworks" do
          table_for Artwork.unscoped.order(created_at: :desc).limit(5) do
            column :id
            column :title
            column :year
            column :position
            column :created_at
            column "" do |artwork|
              link_to "View", admin_artwork_path(artwork)
            end
          end
          div class: "panel-footer" do
            link_to "View All Artworks", admin_artworks_path
          end
        end
      end

      column do
        panel "Recent Videos" do
          table_for Video.unscoped.order(created_at: :desc).limit(5) do
            column :id
            column :title
            column :position
            column :created_at
            column "" do |video|
              link_to "View", admin_video_path(video)
            end
          end
          div class: "panel-footer" do
            link_to "View All Videos", admin_videos_path
          end
        end
      end
    end

    # Custom styles for the dashboard
    div do
      render inline: <<-CSS.html_safe
        <style>
          .stats-grid {
            display: flex;
            gap: 20px;
            justify-content: center;
            padding: 20px 0;
          }
          .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 30px 50px;
            text-align: center;
            color: white;
            min-width: 150px;
          }
          .stat-card h3 {
            font-size: 48px;
            font-weight: 300;
            margin: 0 0 5px 0;
          }
          .stat-card span {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.9;
          }
          .panel-footer {
            padding: 10px;
            text-align: center;
            border-top: 1px solid #e8e8e8;
            margin-top: 10px;
          }
          .panel-footer a {
            color: #5c6ac4;
            text-decoration: none;
            font-weight: 500;
          }
          .panel-footer a:hover {
            text-decoration: underline;
          }
        </style>
      CSS
    end
  end
end
