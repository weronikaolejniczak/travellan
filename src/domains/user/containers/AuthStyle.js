import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const AuthStyle = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
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
