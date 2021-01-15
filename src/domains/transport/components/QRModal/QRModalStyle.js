import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    marginRight: 20,
  },
  iconContainerQR: {
    padding: 10,
  },
  innerQrContainer: {
    alignSelf: 'stretch',
  },
  miniHeader: {
    flexDirection: 'row-reverse',
  },
  qrCardContainer: {
    backgroundColor: Colors.text,
    padding: 5,
    width: (Dimensions.get('window').width / 6) * 5,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },
});
