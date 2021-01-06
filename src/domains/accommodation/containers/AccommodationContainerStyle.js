import { Platform, StyleSheet } from 'react-native';
import { spacingForCardInset } from 'domains/accommodation/components/AccommodationItem/AccommodationItemStyle';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    margin: 10,
    padding: 15,
    width: '40%',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  columnAndRowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? spacingForCardInset : 0,
    paddingTop: '12%',
  },
  contentInsetIOS: {
    bottom: 0,
    left: spacingForCardInset,
    right: spacingForCardInset,
    top: 0,
  },
  dot: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 10,
    margin: 8,
    width: 10,
  },
  icon: {
    margin: 10,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
  },
});
