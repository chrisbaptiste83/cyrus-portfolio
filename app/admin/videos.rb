# frozen_string_literal: true

ActiveAdmin.register Video do
  permit_params :title, :description, :url, :position
end
