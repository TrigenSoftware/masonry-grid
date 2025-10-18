import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import llmsTxt from 'starlight-llms-txt'
import { viewTransitions } from 'astro-vtbot/starlight-view-transitions'

export default defineConfig({
  site: 'https://trigensoftware.github.io',
  base: '/masonry-grid',
  integrations: [
    starlight({
      title: 'Masonry Grid',
      description: 'A fast, lightweight, and responsive masonry grid layout library.',
      logo: {
        src: './src/assets/logo.svg'
      },
      favicon: '/favicon.ico',
      social: [
        {
          label: 'GitHub',
          icon: 'github',
          href: 'https://github.com/TrigenSoftware/masonry-grid'
        }
      ],
      editLink: {
        baseUrl: 'https://github.com/TrigenSoftware/masonry-grid/edit/main/website/'
      },
      plugins: [llmsTxt(), viewTransitions()],
      sidebar: [
        {
          label: 'Start Here',
          autogenerate: {
            directory: 'getting-started'
          }
        },
        {
          label: 'Guides',
          autogenerate: {
            directory: 'guides'
          }
        },
        {
          label: 'API Reference',
          autogenerate: {
            directory: 'api'
          }
        },
        {
          label: 'Examples',
          autogenerate: {
            directory: 'examples'
          }
        }
      ],
      customCss: ['./src/styles/global.css']
    })
  ]
})
