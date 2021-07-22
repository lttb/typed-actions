module.exports = {
  passPerPreset: true,
  presets: [
    '@babel/preset-flow',
    ['@babel/preset-env', { targets: { node: '12' } }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { regenerator: false }],
  ],
}
