import { globalIgnores } from 'eslint/config'
import baseConfig from '@trigen/eslint-config'
import testConfig from '@trigen/eslint-config/test'
import env from '@trigen/eslint-config/env'

export default [
  globalIgnores(['**/dist/', '**/package/']),
  ...baseConfig,
  ...testConfig,
  env.browser
]
