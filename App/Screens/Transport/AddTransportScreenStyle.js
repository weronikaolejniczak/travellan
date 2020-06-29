import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const addTransportScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    padding: 15,
    marginTop: 10,
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
  },
  title: {
    fontSize: 18,
  },
  metrics: {
    paddingVertical: 10,
    marginTop: '5%',
    marginLeft: '10%',
  },
  label: {
    marginRight: '5%',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
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
    marginRight: '10%',
  },
  pickerContainer: {
    //alignItems: 'center',
  },
  picker: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.primary,
    marginTop: '5%',
    marginRight: '10%',
    padding: '4%',
  },
  pickerText: {
    color: Colors.text,
    fontSize: 20,
  },
  returnIcon: {
    color: Colors.text,
    fontSize: 25,
    paddingVertical: 7,
    marginRight: '5%',
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: '2%',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 50,
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
  rowAndCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
