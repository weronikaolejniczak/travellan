import { Colors } from 'constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  action: {
    color: Colors.primary,
  },
  alignAndJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  bigBubble: {
    borderRadius: 60,
    height: 120,
    width: 120,
  },
  bigText: {
    fontSize: 38,
  },
  bubble: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
  },
  callToAction: {
    padding: 15,
  },
  centered: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    paddingTop: '12%',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  dataContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderBottomWidth: 2,
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  date: {
    color: Colors.text,
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: Colors.cards,
    justifyContent: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    width: '100%',
  },
  graphics: {
    flex: 1,
  },
  graphicsContainer: {
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'flex-end',
  },
  ground: {
    alignItems: 'flex-end',
  },
  halfFlex: {
    flex: 0.5,
  },
  itemlessContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  itemlessText: {
    fontSize: 18,
    textAlign: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  marginLeft: {
    marginLeft: 10,
  },
  marginLeftAndRight: {
    marginLeft: 10,
    marginRight: 10,
  },
  marginRight: {
    marginRight: 5,
  },
  marginTop: {
    marginTop: 5,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  rowAlignCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  separator: {
    backgroundColor: Colors.background,
    width: 1,
  },
  smallBubble: {
    borderRadius: 50,
    height: 70,
    width: 70,
  },
  subdate: {
    color: Colors.placeholder,
    fontSize: 11,
  },
  text: {
    color: Colors.text,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 7,
  },
  weatherContainer: {
    backgroundColor: Colors.background,
  },
});
