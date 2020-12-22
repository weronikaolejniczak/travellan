import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'constants/Colors';

const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.8;
export const cardWidth = width * 0.915;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  transportCard: {
    width: cardWidth,
    height: cardHeight,
    marginHorizontal: 5,
    paddingTop: height * 0.0365,
    borderRadius: 15,
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
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
    marginRight: 20,
  },
  iconsAndLinesContainer: {
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalLine: {
    borderColor: Colors.primary,
    height: cardHeight * 0.075,
    borderLeftWidth: 3,
  },
  horizontalLine: {
    marginVertical: 10,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  counterContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: cardWidth * 0.035,
    paddingVertical: cardHeight * 0.01,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
  },
  textAndIconContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  QR: {
    height: '100%',
    width: '100%',
    borderColor: Colors.white,
    borderWidth: 2,
    zIndex: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PDF: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonTouchableLeft: {
    padding: 16,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  containerRow: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'space-between',
  },
  containerQR: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '50%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon2: {
    fontSize: 30,
    color: Colors.text,
  },
  icon3: {
    fontSize: 30,
    color: Colors.text,
    marginTop: 40,
  },
  infoView: {
    flex: 1,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: '5%',
  },
  infoText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  QRView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '5%',
  },
  infoScrollView: {
    marginTop: cardHeight * 0.0465,
  },
  infoInnerView: {flex: 0.5}
});
