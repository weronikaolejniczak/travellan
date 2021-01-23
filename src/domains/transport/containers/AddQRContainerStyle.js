import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'rgb(0,122,255)',
    fontSize: 21,
  },
  buttonTouchable: {
    padding: 16,
  },
  centered: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },

  icon: {
    color: Colors.text,
    fontSize: 40,
  },
  innerQrContainer: {
    alignSelf: 'stretch',
  },
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
