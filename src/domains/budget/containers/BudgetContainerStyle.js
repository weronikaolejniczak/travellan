import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  accounts: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  actions: {
    justifyContent: 'center',
    marginTop: '3%',
    position: 'absolute',
    right: 0,
  },
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeCategory: {
    color: Colors.primary,
  },
  bigMarginTop: {
    marginTop: '10%',
  },
  budgetlessContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  budgetlessText: {
    fontSize: 18,
  },
  categoriesContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  chartContainer: {
    borderColor: Colors.primary,
    borderRadius: 25,
    elevation: 3,
    overflow: 'hidden',
    shadowColor: '#111',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  currenciesContainer: {
    alignItems: 'center',
    backgroundColor: Colors.cards,
    paddingTop: '17%',
  },
  currencyActive: {
    color: Colors.primary,
    fontSize: 22,
  },
  currencyHolder: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  currencyNonactive: {
    color: 'grey',
    fontSize: 22,
  },
  date: {
    color: 'grey',
  },
  detailsContainer: {
    paddingBottom: '5%',
    paddingHorizontal: '5%',
  },
  error: {
    color: Colors.error,
  },
  errorContainer: {
    marginTop: '5%',
  },
  extraSmallMarginTop: {
    marginTop: '2%',
  },
  icon: {
    fontSize: 28,
  },
  iconButton: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
  input: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    color: Colors.text,
    fontSize: 18,
  },
  justifyRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: Colors.placeholder,
  },
  navigationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navigationText: {
    color: Colors.primary,
    fontSize: 18,
  },
  negative: {
    color: Colors.negative,
    fontWeight: 'bold',
  },
  nonactiveCategory: {
    color: 'grey',
  },
  operationCard: {
    marginTop: '4%',
    padding: '4%',
  },
  operationsContent: {
    padding: '5%',
  },
  positive: {
    color: Colors.positive,
    fontWeight: 'bold',
  },
  selectedHistoryItemInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seperator: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    marginVertical: '5%',
    width: '100%',
  },
  smallMarginTop: {
    marginTop: '5%',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.text,
  },
});
