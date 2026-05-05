module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/javascript/**/*.{js,jsx}',
    './app/helpers/**/*.rb',
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["lofi", "dark", "cupcake", "black"],
  },
}
