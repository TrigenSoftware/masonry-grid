import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      formats: ['es'],
      entry: {
        index: './src/index.ts'
      }
    },
    sourcemap: true,
    emptyOutDir: false
  },
  test: {
    setupFiles: '@testing-library/jest-dom/vitest',
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
