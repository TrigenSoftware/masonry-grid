import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
  framework: '@storybook/html-vite',
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-essentials']
}

export default config
