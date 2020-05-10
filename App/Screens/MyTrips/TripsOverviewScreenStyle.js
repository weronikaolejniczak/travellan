import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

// constants for responsive design
const {height, width} = Dimensions.get('window');

export const tripsOverviewScreenStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
      backgroundColor: Colors.background,
      flex: 1,
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
      fontSize: 20,
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
  });
