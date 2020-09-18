import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'constants/Colors';

const {height} = Dimensions.get('window');

export const tripDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: height * 0.44,
  },
  text: {
    color: Colors.text,
  },
  header: {
    fontSize: 24,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    margin: height * 0.03,
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
