import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import llmsTxt from 'starlight-llms-txt'
import { viewTransitions } from 'astro-vtbot/starlight-view-transitions'

export default defineConfig({
  site: 'https://masonry-grid.js.org',
  integrations: [
    starlight({
      title: 'Masonry Grid',
      titleDelimiter: '⭐️',
      description: 'A fast, lightweight, and responsive masonry grid layout library.',
      logo: {
        src: './src/assets/logo.svg'
      },
      favicon: '/favicon.ico',
      head: [
        {
          tag: 'script',
          attrs: {
            'src': 'https://cloud.umami.is/script.js',
            'data-website-id': 'cc85009f-3dcf-4cf0-a2e3-f74066dce2e4',
            'defer': true
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'google-site-verification',
            content: 'JbpBLn9A_qAr4OqSunPoFWeahyME9dMplBMUsaOK_I4'
          }
        }
      ],
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
