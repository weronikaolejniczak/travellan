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
    margin: 10,
    padding: 12,
    width: '40%',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgot: {
    color: Colors.text,
    fontSize: 14,
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
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
  },
  loginWrapper: {
    width: '100%',
  },
  navTextForgot: {
    color: Colors.text,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: '500',
  },
  navTextRegister: {
    color: Colors.primary,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: '500',
  },
  socialsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    //padding: 20,
    paddingTop: 50,
  },
});
