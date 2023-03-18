module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/env', 
      {
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ],
    '@babel/react',
  ]
}