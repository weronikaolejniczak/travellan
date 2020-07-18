import {StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../app/constants/Colors';

export const homeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: '5%',
  },
  button: {
    margin: '2%',
    padding: '4%',
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  header: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
  },
  text: {
    color: Colors.text,
  },
  smallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '5%',
  },
});
