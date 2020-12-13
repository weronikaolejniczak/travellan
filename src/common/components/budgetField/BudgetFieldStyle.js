import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    marginTop: 5,
    color: Colors.text,
  },
  result: {
    padding: 10,
    backgroundColor: '#333',
    borderWidth: 0,
  },
  text: {
    color: Colors.text,
  },
  input: {
    borderWidth: 0,
  },
  error: {
    color: Colors.text,
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.cards,
  },
});
