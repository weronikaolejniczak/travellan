import {StyleSheet, Platform} from 'react-native';
import {spacingForCardInset} from '../../Components/Transport/TransportItem';
import Colors from '../../Constants/Colors';

export const transportScreenStyle = StyleSheet.create({
  scrollview: {
    backgroundColor: Colors.background,
    flex: 1,
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
  text: {
    color: Colors.text,
  },
  itemlessText: {
    fontSize: 20,
  },
  icon: {
    margin: 10,
  },
});
