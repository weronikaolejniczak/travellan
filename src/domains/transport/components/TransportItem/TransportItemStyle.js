import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.8;
export const cardWidth = width * 0.915;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
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
  columnDirection: {
    flexDirection: 'column',
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
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
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
  rowCenter: {
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 16,
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
