import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Budget from 'models/Budget';
import BudgetField from 'components/budgetField/BudgetField';
import { patchBudgetRequest } from 'actions/budgetActions';
import { prepareValue } from '../utils';
import { CURRENCIES } from 'data/Currencies';
import { styles } from './AddCurrencyContainerStyle';
import Colors from 'constants/Colors';

let incorrectCurrency =
  'There is no such currency or the currency already exists in your budget.';

const AddCurrencyContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const currentBudget = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).budget,
  );

  const [budget, setBudget] = useState('');
  const [budgetIsValid, setBudgetIsValid] = useState(false);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('');
  const [currencyIsValid, setCurrencyIsValid] = useState(false);
  const [account, setAccount] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const currencyChangeHandler = (text) => {
    let currencyISO =
      CURRENCIES.filter((item) => item.name === text)[0] !== undefined
        ? CURRENCIES.filter((item) => item.name === text)[0].iso
        : undefined;

    let exists = CURRENCIES.filter((item) => item.name === text).length > 0;

    let isAlreadyDeclared =
      currentBudget !== undefined
        ? currentBudget.filter((item) => item.currency === currencyISO).length >
          0
        : false;

    let validator = exists && !isAlreadyDeclared;

    validator ? setCurrencyIsValid(true) : setCurrencyIsValid(false);
    validator ? setError(null) : setError(incorrectCurrency);
    setCurrency(text);
  };

  let budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
    !(!budgetRegex.test(text) || text.trim().length === 0)
      ? setBudgetIsValid(true)
      : setBudgetIsValid(false);
    setBudget(text);
  };

  const submitHandler = useCallback(async () => {
    setBudgetSubmitted(true);
    if (budgetIsValid && currencyIsValid) {
      let newCurrency = new Budget(
        new Date().toString(),
        prepareValue(budget),
        CURRENCIES.filter((item) => item.name === currency).length > 0
          ? CURRENCIES.filter(
              (item) => item.name === currency,
            )[0].iso.toString()
          : undefined,
        [
          {
            account: account.toString(),
            category: '',
            date: new Date(),
            id: 0,
            title: 'Initial budget',
            value: prepareValue(budget),
          },
        ],
        account.toString(),
      );

      let budgetToSubmit = currentBudget
        ? [...currentBudget, newCurrency]
        : [newCurrency];

      setIsLoading(true);
      try {
        await dispatch(patchBudgetRequest(tripId, budgetToSubmit));
        setIsLoading(false);
        navigation.navigate('Budget', {
          tripId: tripId,
        });
      } catch {
        setError('Something went wrong...');
      }
    } else if (!error) {
      setError('Something went wrong...');
    }
  }, [
    budgetIsValid,
    currencyIsValid,
    error,
    budget,
    account,
    currentBudget,
    currency,
    dispatch,
    tripId,
    navigation,
  ]);

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <BudgetField
        label="Enter initial value"
        styles={styles}
        showSwitch={false}
        toggleBudgetSwitch={() => {}}
        budget={budget}
        budgetIsEnabled={true}
        budgetIsValid={budgetIsValid}
        budgetSubmitted={budgetSubmitted}
        budgetChangeHandler={budgetChangeHandler}
        currency={currency}
        currencyChangeHandler={currencyChangeHandler}
        account={account}
        setAccount={setAccount}
        error={error}
        setError={setError}
      />

      {isLoading ? (
        <View style={styles.smallMarginTop}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitHandler()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default AddCurrencyContainer;
