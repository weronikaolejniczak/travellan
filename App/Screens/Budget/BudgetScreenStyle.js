import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const budgetScreenStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: '12%',
  },
  currenciesContainer: {
    alignItems: 'center',
    height: 50,
  },
  detailsContainer: {
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  chartContainer: {
    borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  currencyActive: {
    color: Colors.primary,
    fontSize: 22,
  },
  currencyNonactive: {
    color: 'grey',
    fontSize: 22,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconButton: {
    padding: '1%',
  },
  activeCategory: {
    color: Colors.primary,
  },
  nonactiveCategory: {
    color: 'grey',
  },
  valueCard: {
    alignItems: 'center',
    padding: 15,
  },
  operationCard: {
    marginTop: '4%',
    padding: '4%',
  },
  input: {
    fontSize: 18,
    color: Colors.text,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  actions: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    marginTop: '3%',
  },
  seperator: {
    width: '100%',
    marginVertical: '5%',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
  },
  label: {
    fontSize: 18,
  },
  icon: {
    fontSize: 28,
  },
  text: {
    color: Colors.text,
  },
  date: {
    color: 'grey',
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
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallMarginTop: {
    marginTop: '5%',
  },
  extraSmallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '10%',
  },
});
