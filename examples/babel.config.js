module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env', 
      {
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          'image-book': '../'
        },
        transformFunctions: ['require', 'require.context'],
      }
    ]
  ]  
}