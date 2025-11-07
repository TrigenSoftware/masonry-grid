import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
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
        'preact',
        'preact/jsx-runtime',
        'preact/hooks',
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
      include: ['src/**/*', '!**/*.stories.ts']
    }
  }
})
