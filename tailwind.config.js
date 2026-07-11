module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/javascript/**/*.{js,jsx}',
    './app/helpers/**/*.rb',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:    ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif:     ['Cinzel', 'Georgia', 'serif'],
        syne:      ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        space:     ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["lofi", "dark", "cupcake", "black"],
  },
}
