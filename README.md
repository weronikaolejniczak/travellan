# Travellan Project

## Overview

Travellan aims to create a semi-automatized solution for trip planning on mobile devices.

## Collaborators

- [weronikaolejniczak](https://github.com/weronikaolejniczak)
- [mkowalczyk97](https://github.com/mkowalczyk97)
- [CalderBriar](https://github.com/CalderBriar)
- [Shanhavael](https://github.com/Shanhavael/)

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
- `yarn android` to run the Android application

### iOS

- `cd ios`
- `pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn ios` to run the iOS application

## Troubleshooting

### Android

- `cd android & ./gradlew clean` for deleting the build folders.

## To-Do

- create a scheme for Pull Requests and commits (subject, description) for constistency,
- describe each feature (can be linked to **README.md** in feature-specific folder),
- choose the license for the repository.

## License

Not chosen yet.
