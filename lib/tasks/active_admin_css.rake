namespace :assets do
  desc "Compile Active Admin CSS with dartsass"
  task :precompile_active_admin do
    puts "Compiling Active Admin CSS..."
    gem_path = Gem::Specification.find_by_name("activeadmin").gem_dir
    load_path = "#{gem_path}/app/assets/stylesheets"

    system(
      "bundle", "exec", "sass",
      "--load-path=#{load_path}",
      "--style=compressed",
      "--no-source-map",
      "app/assets/stylesheets/active_admin.scss",
      "app/assets/builds/active_admin.css"
    ) || raise("Failed to compile Active Admin CSS")

    puts "Active Admin CSS compiled successfully"
  end
end

# Run before assets:precompile
Rake::Task["assets:precompile"].enhance(["assets:precompile_active_admin"])
