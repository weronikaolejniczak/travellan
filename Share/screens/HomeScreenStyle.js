import {StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../App/Constants/Colors';

export const homeScreenStyle = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: '5%',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataContainer: {
    marginTop: '2%',
    marginBottom: '5%',
  },
  choiceContainer: {
    flexDirection: 'row',
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
  icon: {
    fontSize: 24,
    color: Colors.text,
  },
  smallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '5%',
  },
});
