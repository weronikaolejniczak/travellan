import Colors from 'constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cards,
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
