import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  action: {
    color: Colors.primary,
    fontSize: 20,
    justifyContent: 'center',
  },
  calendarButton: {
    backgroundColor: Colors.accent,
    borderRadius: 30,
    padding: 15,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 2,
  },
  calendarIcon: {
    color: Colors.text,
    fontSize: 30,
  },
  callToAction: {
    padding: 15,
  },
  date: {
    color: Colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateBubble: {
    margin: 5,
    padding: 5,
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
  },
  header: {
    fontSize: 28,
  },
  icon: {
    color: Colors.text,
    fontSize: 28,
  },
  image: {
    height: height * 0.45,
    width: '100%',
  },
  imageCredits: {
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
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
});
