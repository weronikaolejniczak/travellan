import { StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
    paddingHorizontal: '5%',
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    paddingHorizontal: '5%',
  },
  modalHeader: {
    marginTop: '2%',
  },
  modalHeaderText: {
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    marginTop: 10,
    justifyContent: 'center',
  },
  stageItemBody: {
    flex: 1,
    flexDirection: 'row',
  },
  stageIcons: {
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
  },
  title: {
    fontSize: 18,
  },
  metrics: {
    marginTop: '5%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  activeLabel: {
    color: Colors.primary,
  },
  disactiveLabel: {
    color: 'grey',
  },
  input: {
    color: Colors.text,
    fontSize: 18,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  picker: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.primary,
    marginTop: '5%',
    padding: '4%',
  },
  pickerText: {
    color: Colors.text,
    fontSize: 18,
  },
  returnIcon: {
    color: Colors.text,
    fontSize: 25,
    paddingVertical: 7,
    marginRight: '5%',
  },
  activeRadioIcon: {
    fontSize: 26,
    color: Colors.primary,
  },
  nonactiveRadioIcon: {
    fontSize: 26,
    color: 'grey',
  },
  icon: {
    fontSize: 26,
    color: Colors.text,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
    margin: '5%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    color: Colors.error,
  },
  rowAndAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
