# Travellan Project
## Overview
Travellan aims to create an automatized solution for trip planning on mobile devices.

## Collaborators
- [weronikaolejniczak](https://github.com/weronikaolejniczak)
- [mkowalczyk97](https://github.com/mkowalczyk97)
- [CalderBriar](https://github.com/CalderBriar)
- [Shanhavael](https://github.com/Shanhavael/travellan-project)

## Requirements
Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.
You also need to install the dependencies required by React Native:
- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)


## Running the project
Assuming you have all the requirements installed, you can setup and run the project by running:
- `yarn install` to install the dependencies
- run the following steps:

### Android
- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn android` to run the Android application (remember to start a simulator or connect an Android phone)

### iOS
- `cd ios`
- `pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)


## Troubleshooting
### Android
#### Invalid regular expression after installing dependencies
Downgrading Node.js helps though it's not the optimal solution. As it turns out, the invalid regular expression is always there, newer versions of Node.js just don't tolerate it anymore.
Have to wait for the fix, meanwhile
`nano ./node_modules/metro-config/src/defaults/blacklist.js`
and change
`var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];`
to
`var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];`
Remember that each time you install a new dependency/reinstall node modules the error will reappear.

#### BatchedBridge error
Error: `Could not get BatchedBridge, make sure your bundle is packaged properly.`
Solution:
- `yarn start --reset-cache`
- `yarn android`

#### Failed to install the app
Error: `Failed to install the app. Make sure you have the Android development environment set up.`
Solution:
- `cd android`
- `./gradlew clean` (on Unix-based CLI)
- `cd ..`
- `yarn android`
If that doesn't help, make sure your emulator and metro server are running, and that you have all necessary Android SDK installed on your machine.

## License
