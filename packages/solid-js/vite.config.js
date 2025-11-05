import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'esnext',
    lib: {
      formats: ['es'],
      entry: {
        index: './src/index.tsx'
      }
    },
    rollupOptions: {
      external: [
        'solid-js',
        'solid-js/web',
        '@masonry-grid/vanilla'
      ]
    },
    sourcemap: true,
    emptyOutDir: false
  },
  test: {
    setupFiles: './test/setup.ts',
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      screenshotFailures: true,
      screenshotDirectory: './__screenshots__',
      instances: [
        {
          browser: 'chromium',
          viewport: {
            width: 1280,
            height: 720
          }
        }
      ]
    },
    exclude: [...configDefaults.exclude, './package'],
    coverage: {
      provider: 'v8',
      reporter: ['lcovonly', 'text'],
      include: ['src/**/*']
    }
  }
})
