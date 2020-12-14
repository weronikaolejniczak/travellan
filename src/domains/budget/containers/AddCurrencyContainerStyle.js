import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '15%',
    paddingHorizontal: '5%',
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
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
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
  icon: {
    color: Colors.text,
    fontSize: 30,
  },
  button: {
    borderRadius: 50,
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
  buttonContainer: {
    marginTop: '5%',
    alignItems: 'center',
  },
  activeCategory: {
    color: Colors.primary,
  },
  nonactiveCategory: {
    color: 'grey',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallMarginTop: {
    marginTop: '5%',
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    color: Colors.error,
  },
});
