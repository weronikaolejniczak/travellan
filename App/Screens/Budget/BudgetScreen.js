import React, {useState, useCallback} from 'react';
import {View, ScrollView, Text, TextInput, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import {addToBudget, subtractFromBudget} from '../../Stores/Actions/Budget';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BudgetScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const budget = selectedTrip.budget;

  console.log(budget.history);

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [amount, setAmount] = useState('0');
  const [title, setTitle] = useState('');

  /** HANDLERS */
  /* const addAmountHandler = useCallback(() => {
    dispatch(addToBudget(tripId, parseInt(amount, 10), title));
  }, [dispatch, tripId, amount, title]);

  const subtractAmountHandler = useCallback(() => {
    dispatch(subtractFromBudget(tripId, parseInt(amount, 10), title));
  }, [dispatch, tripId, amount, title]); */

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.budgetHolder}>
        <Card style={styles.budgetCard}>
          <View style={styles.justifyRow}>
            <Text style={styles.label}>Balance: </Text>
            {budget.value < 0 ? (
              <Text style={styles.negativeBudget}>{budget.value}</Text>
            ) : (
              <Text style={styles.positiveBudget}>{budget.value}</Text>
            )}
          </View>
        </Card>
      </View>

      <View>
        <Text style={styles.label}>Operations</Text>
      </View>
      <View style={[styles.justifyRow, {alignItems: 'center'}]}>
        {/* AMOUNT INPUT */}
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType={'numeric'}
        />

        {/* ADD BUTTON */}
        <TouchableOpacity /* onPress={addAmountHandler()} */>
          <Icon
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            style={styles.addIcon}
          />
        </TouchableOpacity>

        {/* SUBTRACT BUTTON */}
        <TouchableOpacity /* onPress={subtractAmountHandler()} */>
          <Icon
            name={Platform.OS === 'android' ? 'md-remove' : 'ios-remove'}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: '10%'}}>
        <Text style={styles.label}>History</Text>
        <View style={{flex: 1, alignItems: 'center', marginBottom: '5%'}}>
          {budget.history.map((index) => {
            <Card>
              <Text>
                {budget.history[index].title} + {budget.history[index].amount}
              </Text>
            </Card>;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default BudgetScreen;
