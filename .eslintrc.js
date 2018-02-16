'use strict'

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended',
  ],

  rules: {
    'no-unused-expressions': 'off',
    'no-multi-assign': 'off',
    semi: ['error', 'never'],

    'flowtype/no-unused-expressions': 'error',
    'flowtype/generic-spacing': 'off',
  },

  plugins: ['flowtype'],
}
