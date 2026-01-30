import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

// Explicitly import pages since esbuild doesn't support import.meta.glob
import Home from './Pages/Home'
import Gallery from './Pages/Gallery'
import ArenaNegra from './Pages/ArenaNegra'

const pages = {
  Home,
  Gallery,
  ArenaNegra,
}

createInertiaApp({
  resolve: (name) => {
    const page = pages[name]
    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
