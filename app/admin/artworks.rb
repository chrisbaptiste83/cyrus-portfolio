ActiveAdmin.register Artwork do
  permit_params :title, :year, :medium, :dimensions, :position, :image

  index do
    selectable_column
    id_column
    column :title
    column :year
    column :position
    column :image do |artwork|
      if artwork.image.attached?
        image_tag artwork.image, style: "max-height: 50px"
      end
    end
    actions
  end

  show do
    attributes_table do
      row :title
      row :year
      row :medium
      row :dimensions
      row :position
      row :image do |artwork|
        if artwork.image.attached?
          image_tag artwork.image, style: "max-height: 300px"
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :year
      f.input :medium
      f.input :dimensions
      f.input :position
      f.input :image, as: :file
      if f.object.image.attached?
        f.object.image.then do |image|
          para "Current image:"
          para image_tag(image, style: "max-height: 200px")
        end
      end
    end
    f.actions
  end

  filter :title
  filter :year
  filter :medium
end
