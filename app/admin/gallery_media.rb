ActiveAdmin.register GalleryMedia do
  menu label: "Arena Negra Media"

  permit_params :title, :description, :category, :media_type, :credit, :position, :file

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
    column :preview do |media|
      if media.file.attached?
        if media.image?
          image_tag media.file, style: "max-height: 50px"
        else
          content_tag :span, "Video", class: "status_tag"
        end
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
      row :file do |media|
        if media.file.attached?
          if media.image?
            image_tag media.file, style: "max-height: 400px"
          else
            video_tag rails_blob_path(media.file, only_path: true), controls: true, style: "max-height: 400px"
          end
        end
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
        end
      end
    end
    f.actions
  end

  filter :title
  filter :category, as: :select, collection: GalleryMedia.categories.keys.map { |k| [k.humanize, k] }
  filter :media_type, as: :select, collection: GalleryMedia.media_types.keys.map { |k| [k.humanize, k] }
  filter :credit
end
