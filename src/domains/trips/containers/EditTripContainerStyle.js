import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    padding: 15,
    width: '40%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
