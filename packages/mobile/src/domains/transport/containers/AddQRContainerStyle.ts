import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 21,
  },
  buttonTouchable: {
    justifyContent: 'center',
    padding: 16,
  },
  centered: {
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: (Dimensions.get('window').height / 5) * 10,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    height: Dimensions.get('window').height / 5,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  icon: {
    color: Colors.text,
    fontSize: 35,
  },
  innerQrContainer: {
    alignSelf: 'stretch',
  },
  lightView: { alignSelf: 'flex-end', marginBottom: 20 },
  miniHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qrstyle: {
    alignContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    zIndex: 5,
  },
  text: {
    color: Colors.text,
    fontSize: 13.5,
    margin: 16,
    textAlign: 'justify',
  },
  textHead: {
    color: Colors.primary,
    fontSize: 20,
    margin: 16,
    textAlign: 'justify',
  },
});
