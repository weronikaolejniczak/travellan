import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/Atoms/Card';
import {addToBudget, subtractFromBudget} from '../../Stores/Actions/Budget';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';

const BudgetScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const budget = props.route.params.budget;
  const budgetValue = budget.value;
  //console.log(budgetValue);

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [value, setValue] = useState();
  const [displayableAmount, setDisplayableAmount] = useState('');
  const [title, setTitle] = useState('');

  /** HANDLERS */
  const addAmountHandler = () => {
    let amount = parseInt(displayableAmount, 10);
    setDisplayableAmount(displayableAmount + amount);
    dispatch(addToBudget(tripId, amount, title));
  };

  const subtractAmountHandler = () => {
    let amount = parseInt(displayableAmount, 10);
    setDisplayableAmount(displayableAmount - amount);
    dispatch(subtractFromBudget(tripId, amount, title));
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.budgetHolder}>
        <Card style={styles.budgetCard}>
          <View style={styles.justifyRow}>
            <Text style={styles.label}>Balance: </Text>
            {budgetValue &&
              (budgetValue < 0 ? (
                <Text style={styles.negativeBudget}>{budgetValue}</Text>
              ) : (
                <Text style={styles.positiveBudget}>{budgetValue}</Text>
              ))}
          </View>
        </Card>
      </View>

      {/* <View>
        <Text style={styles.label}>Operations</Text>
      </View>
      <View style={[styles.justifyRow, {alignItems: 'center'}]}>
        AMOUNT INPUT
        <TextInput
          style={styles.input}
          value={value}
          placeholder="0"
          placeholderTextColor="grey"
          onChangeText={setValue}
          keyboardType={'numeric'}
        />

        ADD BUTTON
        <TouchableOpacity onPress={() => addAmountHandler()}>
          <Icon
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            style={styles.addIcon}
          />
        </TouchableOpacity>

        SUBTRACT BUTTON
        <TouchableOpacity onPress={() => subtractAmountHandler()}>
          <Icon
            name={Platform.OS === 'android' ? 'md-remove' : 'ios-remove'}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      </View> */}

      {/* <View style={{marginTop: '10%'}}>
        <Text style={styles.label}>History</Text>
        <View style={{flex: 1, alignItems: 'center', marginBottom: '5%'}}>
          {budget.history.map((operation) => {
            <Card>
              <Text>{operation.title}</Text>
            </Card>;
          })}
        </View>
      </View> */}
    </ScrollView>
  );
};

export default BudgetScreen;
