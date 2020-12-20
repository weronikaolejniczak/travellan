import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
    paddingHorizontal: '5%',
  },
  text: {
    color: Colors.text,
  },
  metrics: {
    marginTop: '5%',
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    color: Colors.text,
    fontSize: 18,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: '5%',
    marginBottom: '20%',
  },
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
  },
  amenityCard: {
    marginTop: '2%',
    marginHorizontal: '1%',
    padding: 15,
    width: 'auto',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    fontSize: 24,
    color: Colors.primary,
  },
  iconButton: {
    alignItems: 'center',
    marginLeft: '5%',
    paddingHorizontal: '1%',
  },
  errorContainer: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  error: {
    color: Colors.error,
  },
});
