import { Dimensions, StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height * 0.27,
  },
  headerOverImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  type: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 8,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(2, 2, 2, 0.8)',
    borderRadius: 50,
  },
  rating: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  text: {
    color: Colors.text,
  },
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  subheader: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
