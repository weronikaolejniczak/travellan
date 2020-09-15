import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const newTripStyle = StyleSheet.create({
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
  },
  error: {
    color: Colors.error,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
  },
  switch: {
    marginLeft: '5%',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    marginTop: '1%',
    marginBottom: '17%',
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
  activeCategory: {
    color: Colors.primary,
  },
  nonactiveCategory: {
    color: 'grey',
  },
});
