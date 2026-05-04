import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

import Home from './Pages/Home'
import Gallery from './Pages/Gallery'
import ArenaNegra from './Pages/ArenaNegra'
import ArtworkShow from './Pages/ArtworkShow'
import Contact from './Pages/Contact'
import Bio from './Pages/Bio'

const pages = {
  Home,
  Gallery,
  ArenaNegra,
  ArtworkShow,
  Contact,
  Bio,
}

createInertiaApp({
  resolve: (name) => {
    const page = pages[name]
    if (!page) throw new Error(`Page not found: ${name}`)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
