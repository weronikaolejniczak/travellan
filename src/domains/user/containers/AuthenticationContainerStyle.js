import { StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  authContainer: {
    width: '80%',
  },
  actionsContainer: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    padding: 12,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  input: {
    color: Colors.text,
  },
  formControl: {
    width: '100%',
  },
  input: {
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
    color: Colors.text,
    fontSize: 14,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  label: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },
});
