import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const weatherStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '12%',
  },
  weatherContainer: {},
  actionContainer: {
    marginTop: 10,
  },
  action: {
    color: Colors.primary,
  },
  text: {
    color: Colors.text,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
});
