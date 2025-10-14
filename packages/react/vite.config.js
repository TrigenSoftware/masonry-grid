import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
        'react',
        'react/jsx-runtime',
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
