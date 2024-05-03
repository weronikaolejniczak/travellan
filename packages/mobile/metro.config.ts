const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * metro configuration
 * https://reactnative.dev/docs/metro
 */
const config: import('metro-config').MetroConfig = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
