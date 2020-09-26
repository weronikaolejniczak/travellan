import {StyleSheet, Dimensions} from 'react-native';
/* imports from within the module */
import Colors from 'constants/Colors';

const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.923;
export const spacingForCardInset = width * 0.03;

export const accommodationStyle = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: '5%',
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
  image: {
    width: '100%',
    height: height * 0.3,
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
  headerOverImg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  header: {
    fontSize: 20,
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
  text: {
    color: Colors.text,
  },
  smallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '5%',
  },
});
