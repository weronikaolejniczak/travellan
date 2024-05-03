module.exports = {
  presets: [
    "module:@react-native/babel-preset",
    "module:react-native-dotenv",
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        "alias": {
          "actions": "./src/actions",
          "assets": "./src/common/assets",
          "components": "./src/common/components",
          "constants": "./src/common/constants",
          "data": "./src/common/data",
          "domains": "./src/domains",
          "helpers": "./src/helpers",
          "models": "./src/models",
          "reducers": "./src/reducers",
          "services": "./src/services",
          "src": "./src",
          "styles": "./src/common/styles",
          "themes": "./src/common/themes",
          "utils": "./src/utils"
        }
      }
    ]
  ]
};