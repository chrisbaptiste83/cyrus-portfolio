ActiveAdmin.register GalleryMedia do
  menu label: "Arena Negra Media"

  permit_params :title, :description, :category, :media_type, :credit, :position, :file

  member_action :reupload_to_mux, method: :post do
    resource.reset_and_requeue_mux!
    redirect_to resource_path, notice: "Re-upload to Mux queued."
  end

  index do
    selectable_column
    id_column
    column :title
    column :category do |media|
      status_tag media.category.humanize
    end
    column :media_type do |media|
      media.media_type.humanize
    end
    column :credit
    column :position
    column "Mux Status" do |media|
      if media.video?
        status_tag(media.mux_status || "not uploaded", class: media.mux_status == "ready" ? "yes" : "no")
      end
    end
    column :preview do |media|
      if media.video? && media.mux_playback_id.present?
        image_tag "https://image.mux.com/#{media.mux_playback_id}/thumbnail.jpg?width=80&height=50&fit_mode=smartcrop", style: "max-height: 50px"
      elsif media.file.attached? && media.image?
        image_tag media.file, style: "max-height: 50px"
      elsif media.video?
        content_tag :span, "Video (no Mux)", class: "status_tag"
      end
    end
    actions
  end

  show do
    attributes_table do
      row :title
      row :description
      row :category do |media|
        status_tag media.category.humanize
      end
      row :media_type do |media|
        media.media_type.humanize
      end
      row :credit
      row :position
      row "Mux Asset ID" do |media|
        media.mux_asset_id
      end
      row "Mux Playback ID" do |media|
        media.mux_playback_id
      end
      row "Mux Status" do |media|
        status_tag(media.mux_status || "not uploaded") if media.video?
      end
      row :file do |media|
        if media.video? && media.mux_playback_id.present?
          div do
            image_tag "https://image.mux.com/#{media.mux_playback_id}/thumbnail.jpg?width=400", style: "max-height: 300px"
          end
        elsif media.file.attached?
          if media.image?
            image_tag media.file, style: "max-height: 400px"
          else
            video_tag rails_blob_path(media.file, only_path: true), controls: true, style: "max-height: 400px"
          end
        end
      end
    end

    if resource.video?
      panel "Mux Actions" do
        link_to "Upload/Re-upload to Mux",
                reupload_to_mux_admin_gallery_medium_path(resource),
                method: :post,
                class: "button"
      end
    end
  end

  form do |f|
    f.inputs "Media Details" do
      f.input :title
      f.input :description
      f.input :category, as: :select, collection: GalleryMedia.categories.keys.map { |k| [k.humanize, k] }
      f.input :media_type, as: :select, collection: GalleryMedia.media_types.keys.map { |k| [k.humanize, k] },
              hint: "Select 'Image' for photos, 'Video' for video clips"
      f.input :credit, hint: "Student name or attribution (optional)"
      f.input :position, hint: "Order in which this appears (lower = first)"
      f.input :file, as: :file, hint: "Upload image (JPG, PNG) or video (MP4)"
      if f.object.file.attached?
        if f.object.image?
          para "Current file:"
          para image_tag(f.object.file, style: "max-height: 200px")
        else
          para "Current file: Video attached"
          if f.object.mux_playback_id.present?
            para image_tag("https://image.mux.com/#{f.object.mux_playback_id}/thumbnail.jpg?width=300", style: "max-height: 200px")
          end
        end
      end
    end
    f.actions
  end

  filter :title
  filter :category, as: :select, collection: GalleryMedia.categories.keys.map { |k| [k.humanize, k] }
  filter :media_type, as: :select, collection: GalleryMedia.media_types.keys.map { |k| [k.humanize, k] }
  filter :credit
  filter :mux_status
end
