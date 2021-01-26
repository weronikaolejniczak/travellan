import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5,
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
    marginBottom: 70,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    width: '100%',
  },
  authButton: {
    marginTop: 20,
    width: '49%',
  },
  loginButtonFacebook: {
    backgroundColor: '#4267b2',
    borderRadius: 3,
    color: '#e6eaf4',
    width: '100%',
  },
  loginButtonGoogle: {
    backgroundColor: '#de4d41',
    color: '#f5e7ea',
    width: '100%',
  },
  loginWrapper: {
    width: '100%',
  },
  markedText: {
    color: Colors.primary,
    fontFamily: 'Lato-Regular',
    fontSize: 15.5,
    fontWeight: '500',
    marginTop: 10,
  },
  navTextForgot: {
    color: Colors.primary,
    //color: Colors.text,
    fontFamily: 'Lato-Regular',
    fontSize: 15.5,
    fontWeight: '500',
  },
  navTextRegister: {
    color: Colors.text,
    fontFamily: 'Lato-Regular',
    fontSize: 15.5,
    fontWeight: '500',
    marginTop: 10,
  },
  padding: {
    padding: 20,
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
  socialsContainer: {
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
    padding: 10,
    width: '100%',
  },
  textPrivate: {
    color: Colors.text,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    //marginVertical: 10,
  },
});
