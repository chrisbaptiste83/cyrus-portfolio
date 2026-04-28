# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create default admin user
if AdminUser.count.zero?
  AdminUser.create!(email: "admin@example.com", password: "password", password_confirmation: "password")
  puts "Created default admin user: admin@example.com / password"
end

# Seed artworks from existing public/images
artworks_data = [
  { title: "Autorretrato 2022: Entre el goce y el placer", year: "2022", medium: "Oleo, temple y hoja de oro sobre lienzo y madera", dimensions: "100 cm", image: "image2.jpeg", position: 1 },
  { title: "Chico negro de la perla", year: "2017", medium: "Oleo sobre tela", dimensions: "60 x 50 cm", image: "image3.jpeg", position: 2 },
  { title: "Molting and Regeneration", year: "2017", medium: "Oleo y acrilico sobre tela", dimensions: "190 x 180 cm", image: "image4.jpeg", position: 3 },
  { title: "Nomadic Foreigner", year: "2014", medium: "Oleo sobre tela", dimensions: "110 x 87 cm", image: "image5.png", position: 4 },
  { title: "Suckerpunched", year: "2014", medium: "Oleo sobre tela", dimensions: "100 x 80 cm", image: "image6.jpeg", position: 5 },
  { title: "Desahogo", year: "2017", medium: "Oleo sobre tela", dimensions: "70 x 110.5 cm", image: "image7.jpeg", position: 6 },
  { title: "Butchqueen", year: "2016", medium: "Oleo sobre tela", dimensions: "80 x 60 cm", image: "image8.jpeg", position: 7 },
  { title: "Frazzled", year: "2015", medium: "Oleo sobre tela", dimensions: "90 x 70 cm", image: "image9.jpeg", position: 8 },
  { title: "Metformina", year: "2018", medium: "Oleo sobre hoja de carton", dimensions: "45 x 35 cm", image: "image10.jpeg", position: 9 },
  { title: "Tlacuache", year: "2018", medium: "Temple sobre tela", dimensions: "50 x 50 cm", image: "image11.jpeg", position: 10 },
  { title: "Julio", year: "2015", medium: "Acrilico sobre tela", dimensions: "90 x 70 cm", image: "image12.jpeg", position: 11 },
  { title: "Infestation", year: "2015", medium: "Oleo sobre tela", dimensions: "60 x 80 cm", image: "image13.jpeg", position: 12 },
  { title: "Effervescent", year: "2015", medium: "Oleo sobre tela", dimensions: "90 x 70 cm", image: "image14.jpeg", position: 13 },
  { title: "Mafriend", year: "2015", medium: "Oleo sobre tela", dimensions: "90 x 70 cm", image: "image15.jpeg", position: 14 }
]

artworks_data.each do |data|
  image_file = data.delete(:image)
  artwork = Artwork.find_or_initialize_by(title: data[:title])

  if artwork.new_record?
    artwork.assign_attributes(data)
    image_path = Rails.root.join("public", "images", image_file)
    if File.exist?(image_path)
      artwork.image.attach(io: File.open(image_path), filename: image_file)
      artwork.save!
      puts "Created artwork: #{artwork.title}"
    else
      puts "Image not found: #{image_path}"
    end
  else
    puts "Artwork already exists: #{artwork.title}"
  end
end

# Seed videos from existing public/videos
videos_data = [
  { title: "Arena Negra Video 1", filename: "8cac1188-17be-4e9e-b6a3-d6c8d4aa3e4a.MP4", position: 1 },
  { title: "Arena Negra Video 2", filename: "e271b166-6141-48b2-8f5c-2e3cda478bb8.MP4", position: 2 },
  { title: "Arena Negra Video 3", filename: "ebb0f7b1-00e0-43f3-ac0d-738526af8eec.MP4", position: 3 },
  { title: "Arena Negra Video 4", filename: "f3374a70-99e0-455c-89fb-fee8ac9dc9e8.MP4", position: 4 }
]

videos_data.each do |data|
  video_file = data.delete(:filename)
  video = Video.find_or_initialize_by(title: data[:title])

  if video.new_record?
    video.assign_attributes(data)
    video_path = Rails.root.join("public", "videos", video_file)
    if File.exist?(video_path)
      video.file.attach(io: File.open(video_path), filename: video_file)
      video.save!
      puts "Created video: #{video.title}"
    else
      puts "Video not found: #{video_path}"
    end
  else
    puts "Video already exists: #{video.title}"
  end
end

gallery_images = Dir[Rails.root.join("public", "images", "*")].reject do |path|
  File.basename(path) == "image1.jpeg"
end.sort
gallery_videos = Dir[Rails.root.join("public", "videos", "*")].sort

gallery_images.each_with_index do |path, index|
  filename = File.basename(path)
  media = GalleryMedia.find_or_initialize_by(title: filename)
  media.assign_attributes(
    description: "Restored from project folder",
    category: :exhibition,
    media_type: :image,
    position: index + 1
  )
  media.file.attach(io: File.open(path), filename: filename) unless media.file.attached?
  media.save!
  puts "Restored gallery image: #{filename}"
end

gallery_videos.each_with_index do |path, index|
  filename = File.basename(path)
  media = GalleryMedia.find_or_initialize_by(title: filename)
  media.assign_attributes(
    description: "Restored from project folder",
    category: :event,
    media_type: :video,
    position: index + 1
  )
  media.file.attach(io: File.open(path), filename: filename) unless media.file.attached?
  media.save!
  puts "Restored gallery video: #{filename}"
end

puts "Seeding complete!"
