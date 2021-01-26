import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  btnTxtWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 3,
    flexDirection: 'row',
    height: Dimensions.get('window').height / 15,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontWeight: 'bold',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
});
