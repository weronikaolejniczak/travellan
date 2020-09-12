import {StyleSheet} from 'react-native';

export const budgetFieldStyle = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    marginTop: 5,
    color: '#fff',
  },
  result: {
    padding: 10,
    backgroundColor: '#333',
    borderWidth: 0,
  },
  text: {
    color: '#fff',
  },
  input: {
    borderWidth: 0,
  },
  error: {
    color: '#fff',
  },
  errorContainer: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#111',
  },
});
