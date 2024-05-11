# Travellan

## Overview

Travellan project aims to create an automatized cross-platform solution to the problem of planning and executing trips.

## Project setup

### Requirements
Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.
You also need to install the dependencies required by React Native:
- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

### Running the project
Assuming you have all the requirements installed, you can setup and run the project by running:
- `yarn install` to install the dependencies
- run the following steps:

#### Android
- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn android` to run the Android application

#### iOS
- `cd ios`
- `pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn ios` to run the iOS application

## Troubleshooting

### Android

- `cd android & ./gradlew clean` for deleting the build folders.
