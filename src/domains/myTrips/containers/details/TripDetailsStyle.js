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
    height: height * 0.45,
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
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: height * 0.2,
    padding: 15,
    marginVertical: height * 0.01,
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
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
