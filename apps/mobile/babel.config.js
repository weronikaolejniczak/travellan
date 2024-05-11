module.exports = {
  presets: ['@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          actions: './src/actions',
          assets: './src/common/assets',
          components: './src/common/components',
          constants: './src/common/constants',
          data: './src/common/data',
          domains: './src/domains',
          helpers: './src/helpers',
          models: './src/models',
          reducers: './src/reducers',
          services: './src/services',
          src: './src',
          styles: './src/common/styles',
          themes: './src/common/themes',
          utils: './src/utils',
        },
      },
    ],
  ],
};
