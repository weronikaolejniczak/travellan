import {StyleSheet, Platform} from 'react-native';
import {spacingForCardInset} from '../../Components/Accommodation/AccommodationItemStyle';
import Colors from '../../Constants/Colors';

/**
 * TODO:
 * refactor Fonts
 * refactor Metrics
 */
export const accommodationScreenStyle = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? spacingForCardInset : 0,
  },
  contentInsetIOS: {
    top: 0,
    left: spacingForCardInset,
    bottom: 0,
    right: spacingForCardInset,
  },
  columnAndRowCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowDirection: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Colors.text,
  },
  itemlessText: {
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    margin: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: Colors.primary,
    margin: 8,
    borderRadius: 5,
  },
});
