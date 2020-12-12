import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const NotesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: '12%',
  },
  text: {
    color: Colors.text,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
