import { Dimensions, StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.923;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  recommendationCard: {
    position: 'relative',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
  },
  imageContainer: {
    width: cardWidth,
    height: cardHeight * 0.4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    color: Colors.text,
  },
  details: {
    padding: '5%',
  },
  destination: {
    fontSize: 22,
  },
  date: {
    fontSize: 14,
  },
  alignRow: {
    marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    color: Colors.text,
    fontSize: 18,
  },
  rating: {
    position: 'absolute',
    top: 5,
    right: 30,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  headerOverImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
