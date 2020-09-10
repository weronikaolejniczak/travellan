import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const weatherStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: '12%',
  },
  weatherContainer: {
    backgroundColor: Colors.background,
  },
  graphicsContainer: {
    flex: 0.74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics: {
    flex: 0.65,
  },
  dataContainer: {
    flex: 0.26,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 15,
    paddingHorizontal: 50,
    backgroundColor: '#111111',
    width: '100%',
    flexDirection: 'row',
  },
  actionContainer: {
    marginTop: 10,
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
    color: '#ccc',
  },
  date: {
    color: Colors.text,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: {width: 1, height: 1},
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
    height: 110,
    paddingVertical: 7,
    paddingHorizontal: 13,
    backgroundColor: '#111111',
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
  marginBottom: {
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 10,
  },
  halfFlex: {
    flex: 0.5,
  },
  bubbles: {
    flex: 0.35,
    marginBottom: 15,
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
    position: 'absolute',
    bottom: -7,
  },
  separator: {
    width: 1,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
  },
});
