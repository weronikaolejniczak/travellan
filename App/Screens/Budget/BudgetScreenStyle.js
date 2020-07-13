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
    paddingHorizontal: '5%',
  },
  currencyActive: {
    color: Colors.primary,
    fontSize: 22,
  },
  currencyNonactive: {
    color: 'grey',
    fontSize: 22,
  },
  valueCard: {
    alignItems: 'center',
    padding: 15,
  },
  operationCard: {
    marginTop: '2%',
    padding: '4%',
  },
  input: {
    fontSize: 22,
    color: Colors.text,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  actions: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    marginTop: '2%',
  },
  label: {
    fontSize: 22,
  },
  icon: {
    fontSize: 27,
  },
  text: {
    color: Colors.text,
  },
  negative: {
    fontWeight: 'bold',
    color: Colors.error,
  },
  positive: {
    fontWeight: 'bold',
    color: Colors.green,
  },
  justifyRow: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  bigMarginVertical: {
    marginVertical: '10%',
  },
  smallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '10%',
  },
});
