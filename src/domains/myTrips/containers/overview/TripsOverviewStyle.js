import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const tripsOverviewStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
  },
  triplessContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: Colors.text,
  },
  triplessText: {
    fontSize: 18,
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 15,
  },
  deleteIcon: {
    fontSize: 30,
    color: Colors.primary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
