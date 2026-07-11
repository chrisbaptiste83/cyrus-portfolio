namespace :gcs do
  desc "List orphaned GCS objects (in bucket but not in active_storage_blobs). Pass DESTROY=1 to delete."
  task cleanup: :environment do
    require "google/cloud/storage"

    credentials = Rails.application.credentials.dig(:gcs, :keyfile)
    project     = Rails.application.credentials.dig(:gcs, :project)
    bucket_name = Rails.application.credentials.dig(:gcs, :bucket)

    abort "GCS credentials not configured" unless credentials && project && bucket_name

    storage = Google::Cloud::Storage.new(project_id: project, credentials: credentials)
    bucket  = storage.bucket(bucket_name)

    abort "Bucket '#{bucket_name}' not found" unless bucket

    known_keys = ActiveStorage::Blob.pluck(:key).to_set

    orphans = []
    bucket.files.each do |file|
      orphans << file unless known_keys.include?(file.name)
    end

    if orphans.empty?
      puts "No orphaned files found in #{bucket_name}."
      next
    end

    total_bytes = orphans.sum(&:size)
    puts "Found #{orphans.size} orphaned file(s) — #{(total_bytes / 1024.0 / 1024.0).round(2)} MB total:"
    puts ""
    orphans.each do |f|
      puts "  #{f.name}  (#{(f.size / 1024.0 / 1024.0).round(2)} MB, uploaded #{f.updated_at.strftime('%Y-%m-%d')})"
    end

    if ENV["DESTROY"] == "1"
      puts ""
      puts "Deleting #{orphans.size} file(s)..."
      orphans.each do |f|
        f.delete
        print "."
      end
      puts ""
      puts "Done. #{orphans.size} file(s) removed from #{bucket_name}."
    else
      puts ""
      puts "Dry run — nothing deleted. Re-run with DESTROY=1 to permanently delete these files."
    end
  end
end
