import { StyleSheet, Dimensions } from 'react-native';
import Colors from 'constants/Colors';

const windowHeight = Dimensions.get('window').height * 0.65;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: '5%',
  },
  subheading: {
    paddingTop: '6%',
    textAlign: 'center',
    color: Colors.accent,
    fontWeight: 'bold',
  },
  paragraph: {
    paddingBottom: '5%',
  },
  image: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageSmall: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageMedium: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageView: {
    alignItems: 'center',
    padding: '5%',
  },
  imageLoading: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  color: {
    color: Colors.primary,
  },
});
