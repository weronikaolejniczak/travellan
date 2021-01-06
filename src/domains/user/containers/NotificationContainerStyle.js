import { StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
    paddingHorizontal: '5%',
  },
  itemlessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemlessText: {
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: Colors.text,
  },
  callToAction: {
    padding: 15,
  },
  action: {
    color: Colors.primary,
  },
  marginTop: {
    marginTop: 20,
  },
});
