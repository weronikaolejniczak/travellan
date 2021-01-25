import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height } = Dimensions.get('window');
export const cardHeight = height * 0.83;

export const styles = StyleSheet.create({
  content: {
    padding: '4%',
  },
  headerOverImage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: cardHeight * 0.4,
  },
  rating: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 15,
    width: 50,
  },
  recommendationCard: {
    marginVertical: height * 0.02,
  },
});
