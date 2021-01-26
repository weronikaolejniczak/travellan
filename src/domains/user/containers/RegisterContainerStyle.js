import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
  },
  authContainer: {
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    margin: 10,
    padding: 12,
    width: '40%',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  color_textPrivate: {
    color: Colors.text,
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    fontWeight: '400',
  },
  formControl: {
    width: '100%',
  },
  image: {
    height: 150,
    resizeMode: 'stretch',
    width: 150,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 30,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: Colors.primary,
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    fontWeight: '400',
  },
  registerButton: {
    width: '99%',
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  textPrivate: {
    color: Colors.text,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 35,
  },
});
