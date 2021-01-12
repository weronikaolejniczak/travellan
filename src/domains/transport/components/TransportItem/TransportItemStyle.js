import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.8;
export const cardWidth = width * 0.915;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  PDF: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  QR: {
    alignContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    zIndex: 5,
  },
  QRView: {
    alignItems: 'center',
    flex: 1,
    marginBottom: '5%',
  },
  actions: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    left: 0,
    padding: cardHeight * 0.018,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonTouchableLeft: {
    alignSelf: 'stretch',
    padding: 16,
    textAlign: 'left',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  containerQR: {
    padding: 10,
  },
  containerRow: {
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  counterContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: cardWidth * 0.035,
    paddingVertical: cardHeight * 0.01,
    width: 48,
  },
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  horizontalLine: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
    marginRight: 20,
  },
  icon2: {
    color: Colors.text,
    fontSize: 30,
  },
  icon3: {
    color: Colors.text,
    fontSize: 30,
  },
  iconsAndLinesContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  infoInnerView: { flex: 0.5 },
  infoScrollView: {
    marginTop: cardHeight * 0.0465,
  },
  infoText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  infoView: {
    alignItems: 'baseline',
    flex: 1,
    flexDirection: 'row',
    marginBottom: '5%',
    paddingHorizontal: 22,
  },
  innerQrContainer: {
    alignSelf: 'stretch',
  },
  miniHeader: {
    alignContent: 'space-between',
    flexDirection: 'row',
  },
  qrCardContainer: {
    padding: 5,
    width: (Dimensions.get('window').width / 5) * 4,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: Colors.,
    flex: 1,
    justifyContent: 'center',
  },
  rowCenter: {
    alignItems: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
  textAndIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  transportCard: {
    borderRadius: 15,
    height: cardHeight,
    marginHorizontal: 5,
    paddingTop: height * 0.0365,
    width: cardWidth,
  },
  verticalLine: {
    borderColor: Colors.primary,
    borderLeftWidth: 3,
    height: cardHeight * 0.075,
  },
});
