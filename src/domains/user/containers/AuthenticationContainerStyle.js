import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5,
  },
  authButton: {
    marginTop: 20,
    width: '49%',
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
    marginTop: 5,
  },
  loginButton: {
    width: '100%',
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
    marginLeft: 30,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
});
