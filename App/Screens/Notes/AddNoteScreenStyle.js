import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const newNoteScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
    paddingHorizontal: '5%',
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    color: Colors.text,
    fontSize: 18,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
    marginVertical: '10%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  errorContainer: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  error: {
    color: Colors.error,
  },
});
