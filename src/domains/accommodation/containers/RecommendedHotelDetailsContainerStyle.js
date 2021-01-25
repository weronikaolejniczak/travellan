import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
  },
  date: {
    fontSize: 14,
  },
  destination: {
    fontSize: 22,
  },
  details: {
    padding: '5%',
  },
  header: {
    color: Colors.text,
    fontSize: 18,
  },
  headerOverImage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height * 0.4,
    width: '100%',
  },
  rating: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: 30,
    top: 5,
  },
  text: {
    color: Colors.text,
  },
});
