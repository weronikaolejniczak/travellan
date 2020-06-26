import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const addTransportScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
  metrics: {
    paddingVertical: 10,
    marginTop: '5%',
  },
  label: {
    marginRight: '5%',
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
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.primary,
    marginTop: 15,
    padding: 15,
    paddingHorizontal: '20%',
  },
  pickerText: {
    color: Colors.text,
    fontSize: 20,
  },
  returnIcon: {
    fontSize: 25,
    color: Colors.text,
    paddingVertical: 7,
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
    //marginRight: 30,
    paddingHorizontal: 7,
  },
  iconButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
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
});
