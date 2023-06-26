module.exports = {
  ignorePatterns: [
    '**/*.test.js',
    'src/test'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'semistandard',
    'standard',
    'plugin:react/all'
  ],
  rules: {
    indent: ['error', 2],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-no-literals': [0],
    'react/forbid-component-props': [0],
    'react/jsx-max-depth': [0]
  }
}
