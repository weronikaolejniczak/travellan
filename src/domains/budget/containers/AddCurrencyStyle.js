import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const AddCurrencyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
  },
  text: {
    color: Colors.text,
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  elementContainer: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  input: {
    color: Colors.text,
    fontSize: 18,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.primary,
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
  },
  pickerText: {
    color: Colors.text,
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
});
