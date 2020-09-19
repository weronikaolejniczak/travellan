import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const budgetStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  currenciesContainer: {
    backgroundColor: Colors.cards,
    alignItems: 'center',
    paddingTop: '17%',
  },
  detailsContainer: {
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  chartContainer: {
    //borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderColor: Colors.primary,
    //borderStyle: 'dashed',
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  currencyHolder: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 25,
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
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  iconButton: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
  },
  activeCategory: {
    color: Colors.primary,
  },
  nonactiveCategory: {
    color: 'grey',
  },
  overviewContainer: {
    backgroundColor: Colors.cards,
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
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
  accounts: {
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  budgetlessContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  budgetlessText: {
    fontSize: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: '5%',
  },
  error: {
    color: Colors.error,
  },
});
