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
    themes: ["light", "dark", "cupcake", "black"],
  },
}
