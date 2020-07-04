import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Constants/Colors';

const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.925;
export const spacingForCardInset = width * 0.03;

/**
 * TODO:
 * refactor Fonts
 * refactor Metrics
 */
export const accommodationItemStyle = StyleSheet.create({
  accommodation: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 15,
    marginHorizontal: width * 0.01,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.02,
  },
  container: {
    paddingTop: height * 0.02,
    paddingHorizontal: width * 0.03,
  },
  headerOverImg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.27,
  },
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  h2: {
    color: Colors.text,
    fontSize: 18,
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
  },
  text: {
    color: Colors.text,
  },
  textAlign: {
    textAlign: 'justify',
  },
  actions: {
    flexDirection: 'row',
    padding: cardHeight * 0.018,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
    marginRight: 30,
  },
  benefitIcon: {
    fontSize: 24,
    color: Colors.primary,
  },
  benefitsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2%',
  },
});
