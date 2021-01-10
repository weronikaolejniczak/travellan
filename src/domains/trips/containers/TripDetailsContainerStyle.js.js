import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  action: {
    color: Colors.primary,
    fontSize: 20,
    justifyContent: 'center',
  },
  calendarIcon: {
    backgroundColor: Colors.transparentShadow,
    borderRadius: 35,
    color: Colors.text,
    padding: 15,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 200,
  },
  callToAction: {
    padding: 15,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  date: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: height * 0.03,
  },
  header: {
    fontSize: 24,
  },
  image: {
    height: height * 0.45,
    width: '100%',
  },
  justifyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  text: {
    color: Colors.text,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
