import { StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    backgroundColor: Colors.background,
  },
  graphicsContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  graphics: {
    flex: 1,
  },
  dataContainer: {
    flex: 0.3,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callToAction: {
    padding: 15,
  },
  action: {
    color: Colors.primary,
  },
  bigText: {
    fontSize: 38,
  },
  text: {
    color: Colors.text,
  },
  subdate: {
    fontSize: 11,
    color: Colors.grey,
  },
  date: {
    color: Colors.text,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    width: '100%',
    backgroundColor: Colors.cards,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: '12%',
  },
  itemlessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemlessText: {
    fontSize: 18,
    textAlign: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
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
  halfFlex: {
    flex: 0.5,
  },
  bubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBubble: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  bigBubble: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignAndJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  ground: {
    alignItems: 'flex-end',
  },
  separator: {
    width: 1,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
  },
});
