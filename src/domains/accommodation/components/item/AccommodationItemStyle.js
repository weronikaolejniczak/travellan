import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'constants/Colors';

const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.923;
export const spacingForCardInset = width * 0.03;

export const accommodationItemStyle = StyleSheet.create({
  accommodation: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 15,
    marginHorizontal: width * 0.01,
    overflow: 'hidden',
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: '2%',
    padding: '4%',
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  twoColumn: {
    flexDirection: 'row',
  },
  col: {
    width: '50%',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  accommodationType: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 8,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(2, 2, 2, 0.8)',
    borderRadius: 50,
  },
  bookingRating: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  checkInAndOut: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  checkIcon: {
    justifyContent: 'center',
  },
  additionalInfo: {
    justifyContent: 'center',
  },
  checkheader: {
    flexDirection: 'row',
  },
  parentView: {
    paddingHorizontal: 10,
    marginTop: 12,
    marginBottom: 15,
  },
  smallerHeader: {
    fontSize: 16,
  },
  subheader: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  label: {
    fontSize: 16,
  },
  smallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '5%',
  },
});
