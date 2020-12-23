import { Dimensions, StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.923;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  accommodation: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 15,
    marginHorizontal: width * 0.01,
    overflow: 'hidden',
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
  checkHeader: {
    flexDirection: 'row',
  },
  parentView: {
    paddingHorizontal: 10,
    marginTop: 12,
    marginBottom: 15,
  },
  header: {
    color: Colors.text,
    fontSize: 18,
  },
  smallerHeader: {
    fontSize: 16,
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
