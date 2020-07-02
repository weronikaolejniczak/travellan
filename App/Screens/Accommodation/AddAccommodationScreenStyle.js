import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const addAccommodationScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
  metrics: {
    marginTop: '5%',
    paddingVertical: 10,
  },
  label: {
    marginRight: '10%',
    marginLeft: '10%',
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: Colors.text,
    fontSize: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
    marginLeft: '10%',
    marginRight: '10%',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
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
  icon: {
    fontSize: 24,
    color: Colors.text,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: '1%',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 50,
  },
  errorContainer: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  error: {
    color: Colors.error,
  },
});
