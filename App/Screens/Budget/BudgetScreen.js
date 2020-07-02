import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import {
  fetchBudget,
  addToBudget,
  subtractFromBudget,
} from '../../Stores/Actions/Budget';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';
import Colors from '../../Constants/Colors';

const BudgetScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const budget = selectedTrip.budget;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [displayableAmount, setDisplayableAmount] = useState('');
  const [title, setTitle] = useState('');

  /** HANDLERS */
  const addAmountHandler = () => {
    let amount = parseInt(displayableAmount, 10);
    dispatch(addToBudget(tripId, parseInt(amount, 10), title));
  };

  const subtractAmountHandler = () => {
    let amount = parseInt(displayableAmount, 10);
    dispatch(subtractFromBudget(tripId, parseInt(amount, 10), title));
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.budgetHolder}>
        <Card style={styles.budgetCard}>
          <View style={styles.justifyRow}>
            <Text style={styles.label}>Balance: </Text>
            {/* {budget.value ? (
              budget.value < 0 ? (
                <Text style={styles.negativeBudget}>{budget.value}</Text>
              ) : (
                <Text style={styles.positiveBudget}>{budget.value}</Text>
              )
            ) : (
              console.log('error')
            )} */}
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
          value={displayableAmount}
          onChangeText={setDisplayableAmount}
          keyboardType={'numeric'}
        />

        {/* ADD BUTTON */}
        <TouchableOpacity onPress={() => addAmountHandler()}>
          <Icon
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            style={styles.addIcon}
          />
        </TouchableOpacity>

        {/* SUBTRACT BUTTON */}
        <TouchableOpacity onPress={() => subtractAmountHandler()}>
          <Icon
            name={Platform.OS === 'android' ? 'md-remove' : 'ios-remove'}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      </View>

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
