module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@data': './src/data',
          '@contactoperations': './src/contactoperations',
          '@presentation': './src/presentation',
          '@utils':'./src/utils',
          '@hooks':'./src/hooks'
        }
      }
    ]
  ]
};
