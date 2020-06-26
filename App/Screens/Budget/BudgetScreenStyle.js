import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

const {height, width} = Dimensions.get('window');

export const budgetScreenStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  label: {
    marginRight: '10%',
    marginLeft: '10%',
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: Colors.text,
    fontSize: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
    width: '55%',
    marginLeft: '10%',
  },
  addIcon: {
    paddingHorizontal: '5%',
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
  budgetHolder: {
    margin: '10%',
  },
  budgetCard: {
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.01,
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
    alignItems: 'center',
  },
});
