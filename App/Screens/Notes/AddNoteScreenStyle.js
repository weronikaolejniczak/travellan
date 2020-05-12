import {StyleSheet} from 'react-native';

export const newNoteScreenStyle = StyleSheet.create({
  form: {
    backgroundColor: '#222222',
    flex: 1,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '5%',
    color: '#FF8C00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#FFA500',
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
    marginLeft: '10%',
    marginRight: '10%',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
