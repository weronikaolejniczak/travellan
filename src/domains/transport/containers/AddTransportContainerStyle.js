import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activeLabel: {
    color: Colors.primary,
  },
  activeRadioIcon: {
    color: Colors.primary,
    fontSize: 26,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    margin: '5%',
    padding: 15,
    width: '40%',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 15,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '12%',
  },
  disactiveLabel: {
    color: 'grey',
  },
  errorContainer: {
    marginVertical: 5,
  },
  icon: {
    color: Colors.text,
    fontSize: 26,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  input: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    color: Colors.text,
    fontSize: 18,
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  metrics: {
    marginTop: '5%',
  },
  nonactiveRadioIcon: {
    color: 'grey',
    fontSize: 26,
  },
  picker: {
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: '5%',
    padding: '4%',
  },
  pickerText: {
    color: Colors.text,
    fontSize: 18,
  },
  rowAndAlign: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stageIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
  },
  stageItemBody: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: Colors.text,
  },
  title: {
    fontSize: 18,
  },
});
