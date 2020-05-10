import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

const {height} = Dimensions.get('window');

export const tripDetailScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: height * 0.51,
  },
  text: {
    color: Colors.text,
  },
  header: {
    fontSize: 24,
  },
  dateContainer: {
    margin: height * 0.03,
    height: height * 0.08,
    justifyContent: 'center',
  },
  date: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: height * 0.19,
    padding: 15,
    margin: height * 0.01,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  justifyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
