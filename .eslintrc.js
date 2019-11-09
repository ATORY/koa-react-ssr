module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
    'no-underscore-dangle':  ["error", { "allow": ["__PRELOADED_STATE__", "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }],
    'no-console': ["error", { allow: ["warn", "error", 'info']}]
  }
};
