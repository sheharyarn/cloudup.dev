module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: 'react-app',
  rules: {
    'react/jsx-pascal-case': ['enabled', { allowAllCaps: true }],
  },
}
