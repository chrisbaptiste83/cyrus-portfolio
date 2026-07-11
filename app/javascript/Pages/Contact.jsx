import React from 'react'
import Layout from './Layout'
import { Head, useForm } from '@inertiajs/react'

export default function Contact() {
  const { data, setData, post, processing } = useForm({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/contact', {
      onSuccess: () => {
        setData({ name: '', email: '', message: '' })
      }
    })
  }

  return (
    <Layout>
      <Head>
        <title>Contact — Cyrus Baptiste</title>
        <meta name="description" content="Get in touch with Cyrus Baptiste, artist and educator based in Monterrey, Mexico." />
        <meta property="og:title" content="Contact — Cyrus Baptiste" />
      </Head>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 text-center">
        <p className="font-space text-xs sm:text-sm tracking-[0.25em] uppercase text-base-content/40 mb-3 sm:mb-4">Get in touch</p>
        <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6">Contact</h1>
        <p className="text-base-content/60 max-w-md mx-auto">
          Interested in a piece, a collaboration, or an art class at Arena Negra? Send a message.
        </p>
      </section>

      {/* Form */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-32">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-base-content/50 mb-2">
                Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                required
                className="w-full px-4 py-3 bg-base-200/50 border border-base-content/10 focus:outline-none focus:border-base-content/40 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-base-content/50 mb-2">
                Email
              </label>
              <input
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                required
                className="w-full px-4 py-3 bg-base-200/50 border border-base-content/10 focus:outline-none focus:border-base-content/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-base-content/50 mb-2">
                Message
              </label>
              <textarea
                value={data.message}
                onChange={e => setData('message', e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 bg-base-200/50 border border-base-content/10 focus:outline-none focus:border-base-content/40 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 border border-base-content/20 hover:bg-base-content hover:text-base-100 transition-all duration-300 text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* Alternative contact */}
          <div className="mt-16 pt-8 border-t border-base-content/10 text-center">
            <p className="text-sm text-base-content/40 mb-6">Or find me on Instagram</p>
            <div className="flex items-center justify-center gap-8">
              <a
                href="https://www.instagram.com/cyrusbaptiste.artist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-base-content/50 hover:text-base-content transition-colors"
              >
                @cyrusbaptiste.artist
              </a>
              <a
                href="https://www.instagram.com/arenanegragaleria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-base-content/50 hover:text-base-content transition-colors"
              >
                @arenanegragaleria
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
