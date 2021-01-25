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
  itemlessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemlessText: {
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: Colors.text,
  },
  callToAction: {
    padding: 15,
  },
  action: {
    color: Colors.primary,
  },
  marginTop: {
    marginTop: 20,
  },
  headline: {
    textAlign: 'center',
    color: Colors.primary,
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
  color: {
    color: Colors.primary,
  },
});
