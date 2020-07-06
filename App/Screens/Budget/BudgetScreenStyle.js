import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

const {height, width} = Dimensions.get('window');

export const budgetScreenStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  currenciesContainer: {
    alignItems: 'center',
  },
  detailsContainer: {
    paddingHorizontal: '10%',
  },
  currency: {
    fontSize: 22,
  },
  addIcon: {
    fontSize: 27,
    color: Colors.green,
  },
  removeIcon: {
    fontSize: 27,
    color: Colors.error,
  },
  text: {
    color: Colors.text,
  },
  negativeBudget: {
    fontSize: 27,
    color: Colors.error,
  },
  positiveBudget: {
    fontSize: 27,
    color: Colors.green,
  },
  justifyRow: {
    flexDirection: 'row',
  },
});
