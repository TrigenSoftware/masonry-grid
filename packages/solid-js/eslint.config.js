import moduleConfig from '@trigen/eslint-config/module'
import tsTypeCheckedConfig from '@trigen/eslint-config/typescript-type-checked'
import testConfig from '@trigen/eslint-config/test'
import storybookConfig from '@trigen/eslint-config/storybook'
import env from '@trigen/eslint-config/env'
import rootConfig from '../../eslint.config.js'

export default [
  ...rootConfig,
  ...moduleConfig,
  ...tsTypeCheckedConfig,
  ...testConfig,
  ...storybookConfig,
  env.node,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
]
