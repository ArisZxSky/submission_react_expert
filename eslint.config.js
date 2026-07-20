import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const sharedRules = {
  ...js.configs.recommended.rules,
  ...react.configs.recommended.rules,
  ...react.configs['jsx-runtime'].rules,
  ...reactHooks.configs.recommended.rules,
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],
  eqeqeq: ['error', 'always'],
  curly: ['error', 'multi-line'],
  semi: ['error', 'never'],
  quotes: ['error', 'single', {
    allowTemplateLiterals: true,
    avoidEscape: true
  }],
  'jsx-quotes': ['error', 'prefer-single'],
  'comma-dangle': ['error', 'never'],
  'object-curly-spacing': ['error', 'always'],
  'array-bracket-spacing': ['error', 'never'],
  'space-before-function-paren': ['error', {
    anonymous: 'always',
    asyncArrow: 'always',
    named: 'always'
  }]
}

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'storybook-static',
      'playwright-report',
      'test-results',
      'coverage'
    ]
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: sharedRules
  },
  {
    files: [
      'src/**/*.test.{js,jsx}',
      'src/**/*.stories.{js,jsx}',
      'src/test/**/*.{js,jsx}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'react-refresh/only-export-components': 'off'
    }
  },
  {
    files: [
      '*.config.js',
      '.storybook/**/*.{js,jsx}',
      'e2e/**/*.js'
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...sharedRules,
      'react-refresh/only-export-components': 'off'
    }
  }
]
