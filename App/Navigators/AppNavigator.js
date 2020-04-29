import { createAppContainer, createStackNavigator } from 'react-navigation'

// screens
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import MainScreen from 'App/Containers/Main/MainScreen'
import MenuScreen from 'App/Containers/Menu/MenuScreen'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    // The main application screen is our "MainScreen". Might end up being a registering/logging in panel, otherwise it'll get deleted.
    MainScreen: MainScreen,
    // The menu screen for all our workflows inside the app.
    MenuScreen: MenuScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
