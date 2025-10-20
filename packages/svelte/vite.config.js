import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
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
      include: ['src/**/*'],
      exclude: ['**/*.stories.*', '**/*.spec.*']
    }
  }
})
