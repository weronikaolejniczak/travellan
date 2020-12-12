import {StyleSheet, Platform} from 'react-native';
import {spacingForCardInset} from 'domains/accommodation/components/accItem/AccItemStyle';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: '12%',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
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
