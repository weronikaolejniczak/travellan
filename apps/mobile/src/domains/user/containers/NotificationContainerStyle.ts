import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  action: {
    color: Colors.primary,
  },
  callToAction: {
    padding: 15,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '12%',
  },
  itemlessContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  itemlessText: {
    fontSize: 18,
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 20,
  },
  text: {
    color: Colors.text,
  },
});
