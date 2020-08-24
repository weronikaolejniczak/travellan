import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const addNoteStyle = StyleSheet.create({
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
  buttonContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  smallPaddingTop: {
    paddingTop: '5%',
  },
  errorContainer: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  error: {
    color: Colors.error,
  },
});
