import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BudgetScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const budget = selectedTrip.budget;
  const [amount, setAmount] = useState('0');

  const addAmountHandler = (budgetToChange, amountToAdd) => {
    budgetToChange += amountToAdd;
    // useDispatch add an amount to budget value
  };

  const subtractAmountHandler = (budgetToChange, amountToSubtract) => {
    budgetToChange += amountToSubtract;
    // useDispatch subtract an amount from budget value
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.budgetHolder}>
        <Card style={styles.budgetCard}>
          <View style={styles.justifyRow}>
            <Text style={styles.label}>Balance: </Text>
            {budget < 0 ? (
              <Text style={styles.negativeBudget}>{budget}</Text>
            ) : (
              <Text style={styles.positiveBudget}>{budget}</Text>
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
        <TouchableOpacity onPress={addAmountHandler(budget, amount)}>
          <Icon name="md-add" style={styles.addIcon} />
        </TouchableOpacity>
        {/* SUBTRACT BUTTON */}
        <TouchableOpacity onPress={subtractAmountHandler(budget, amount)}>
          <Icon name="md-remove" style={styles.removeIcon} />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: '10%'}}>
        <Text style={styles.label}>History</Text>
      </View>
    </ScrollView>
  );
};

export default BudgetScreen;
