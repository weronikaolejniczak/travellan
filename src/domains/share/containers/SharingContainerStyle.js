import { StyleSheet, Dimensions } from 'react-native';
import Colors from 'constants/Colors';

const windowHeight = Dimensions.get('window').height;
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
    height: windowHeight * 0.7,
    resizeMode: 'stretch',
    width: windowWidth * 0.7,
  },
  imageSmall: {
    height: windowHeight * 0.4,
    resizeMode: 'stretch',
    width: windowWidth * 0.8,
  },
  imageMedium: {
    height: windowHeight * 0.7,
    resizeMode: 'stretch',
    width: windowWidth * 0.8,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageLoading: {
    height: windowHeight * 0.4,
    resizeMode: 'stretch',
    width: windowWidth,
  },
  color: {
    color: Colors.primary,
  },
});
