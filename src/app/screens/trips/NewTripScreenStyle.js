import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

/**
 * TODO:
 * refactor Fonts
 * refactor Metrics
 */
export const newTripScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: '5%',
    paddingTop: '12%',
  },
  bigMarginTop: {
    marginTop: '10%',
  },
  smallMarginTop: {
    marginTop: '5%',
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
  errorContainer: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  error: {
    color: Colors.error,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 25,
    borderColor: Colors.primary,
    marginTop: 15,
    padding: 15,
  },
  pickerText: {
    color: Colors.text,
    fontSize: 18,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
  },
  switch: {
    marginLeft: '5%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    marginVertical: '5%',
    padding: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  rowAndCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
