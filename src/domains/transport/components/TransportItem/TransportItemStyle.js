import { Dimensions, StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.8;
export const cardWidth = width * 0.915;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  actions: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    left: 0,
    padding: cardHeight * 0.018,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  addressOfDeparture: {
    ...Metrics.verticalMargin,
  },
  card: {
    borderRadius: 15,
    height: cardHeight,
    marginHorizontal: 5,
    paddingTop: height * 0.0365,
    width: cardWidth,
  },
  dateOfDeparture: {
    ...Metrics.verticalMargin,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
    marginRight: 20,
  },
  info: {
    ...Metrics.bigHorizontalPadding,
  },
  title: {
    textAlign: 'center',
    ...Metrics.bigVerticalMargin,
  },
});
