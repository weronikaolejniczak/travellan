import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  authContainer: {
    width: '80%',
  },
  actionsContainer: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    margin: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: Colors.primary,
    width: '40%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  input: {
    color: Colors.text,
  },
});