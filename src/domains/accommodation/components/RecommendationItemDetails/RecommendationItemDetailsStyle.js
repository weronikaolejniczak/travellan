import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.923;
export const spacingForCardInset = width * 0.03;

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
    height: cardHeight * 0.4,
    width: cardWidth,
  },
  rating: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: 30,
    top: 5,
  },
  recommendationCard: {
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
    position: 'relative',
  },
  text: {
    color: Colors.text,
  },
});
