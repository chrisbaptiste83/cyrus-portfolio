ActiveAdmin.register Video do
  permit_params :title, :position, :file

  index do
    selectable_column
    id_column
    column :title
    column :position
    column :file do |video|
      if video.file.attached?
        link_to "View Video", rails_blob_path(video.file, disposition: "inline"), target: "_blank", rel: "noopener"
      end
    end
    actions
  end

  show do
    attributes_table do
      row :title
      row :position
      row :file do |video|
        if video.file.attached?
          video_tag rails_blob_path(video.file, disposition: "inline"),
                    controls: true,
                    style: "max-width: 400px"
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :position
      f.input :file, as: :file
      if f.object.file.attached?
        para "Current video: #{f.object.file.filename}"
      end
    end
    f.actions
  end

  filter :title
end
