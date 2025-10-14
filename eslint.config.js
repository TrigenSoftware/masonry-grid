import { globalIgnores } from 'eslint/config'
import baseConfig from '@trigen/eslint-config'
import moduleConfig from '@trigen/eslint-config/module'
import tsTypeCheckedConfig from '@trigen/eslint-config/typescript-type-checked'
import testConfig from '@trigen/eslint-config/test'
import storybookConfig from '@trigen/eslint-config/storybook'
import env from '@trigen/eslint-config/env'

export default [
  globalIgnores(['**/dist/', '**/package/']),
  ...baseConfig,
  ...moduleConfig,
  ...tsTypeCheckedConfig,
  ...testConfig,
  ...storybookConfig,
  env.browser,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-use-before-define': 'off'
    }
  }
]
