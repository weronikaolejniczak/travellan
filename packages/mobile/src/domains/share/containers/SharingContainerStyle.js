import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const windowHeight = Dimensions.get('window').height * 0.65;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  color: {
    color: Colors.primary,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: '5%',
  },
  image: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageLoading: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageMedium: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageSmall: {
    height: windowHeight,
    resizeMode: 'center',
    width: windowWidth,
  },
  imageView: {
    alignItems: 'center',
    padding: '5%',
  },
  paragraph: {
    paddingBottom: '5%',
  },
  subheading: {
    color: Colors.accent,
    fontWeight: 'bold',
    paddingTop: '6%',
    textAlign: 'center',
  },
});
