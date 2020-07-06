import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const budgetScreenStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  currenciesContainer: {
    padding: '5%',
    alignItems: 'center',
  },
  detailsContainer: {
    paddingHorizontal: '10%',
  },
  currencyActive: {
    color: Colors.primary,
    fontSize: 22,
  },
  currencyNonactive: {
    color: 'grey',
    fontSize: 22,
  },
  currencyHolder: {},
  addIcon: {
    fontSize: 27,
    color: Colors.green,
  },
  removeIcon: {
    fontSize: 27,
    color: Colors.error,
  },
  label: {
    fontSize: 22,
  },
  text: {
    color: Colors.text,
  },
  icon: {
    fontSize: 27,
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
