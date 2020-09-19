import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
/** imports from within the module */
import Budget from 'budget/models/Budget';
import BudgetField from 'common/components/budgetField/BudgetField';
import * as budgetActions from 'budget/state/Actions';
import {AddCurrencyStyles as styles} from './AddCurrencyStyle';
import Colors from 'constants/Colors';
import {CURRENCIES} from 'data/Currencies';

const AddCurrency = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const currentBudget = props.route.params.currentBudget;

  const [budget, setBudget] = useState('');
  const [budgetIsValid, setBudgetIsValid] = useState(false);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('');
  const [account, setAccount] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /* HANDLERS */
  // handle validity of budget
  let budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
    !(!budgetRegex.test(text) || text.trim().length === 0)
      ? setBudgetIsValid(true)
      : setBudgetIsValid(false);
    setBudget(text);
  };

  // prepare budget value for saving
  const prepareValue = (value) => {
    // replace each whitespace in passed string with empty symbol
    value = value.replace(/ /g, '');
    // parse to float and round up to 2 decimal points
    value = parseFloat(value).toFixed(2);
    // as toFixed() converts the number to string, parse to float again
    value = parseFloat(value);
    // if parsing results in NaN, i.e. the first symbol of value is not a number, return 0 for safety
    if (isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  };

  // handle submition
  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    if (
      budgetIsValid &&
      CURRENCIES.filter((item) => item.name === currency).length > 0
    ) {
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
            id: 0,
            title: 'Initial budget',
            value: prepareValue(budget),
            category: '',
            account: account.toString(),
            date: new Date(),
          },
        ],
      );

      let budgetToSubmit = currentBudget
        ? [...currentBudget, newCurrency]
        : [newCurrency];

      await dispatch(budgetActions.updateBudget(tripId, budgetToSubmit));
      props.navigation.navigate('Budget', {
        tripId: tripId,
      });
    } else {
      setBudgetSubmitted(true);
    }
    setIsLoading(false);
  }, [
    budgetIsValid,
    currency,
    budget,
    account,
    currentBudget,
    dispatch,
    tripId,
    props.navigation,
  ]);

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <BudgetField
        label={'Enter initial value'}
        styles={styles}
        showSwitch={false}
        toggleBudgetSwitch={() => {}}
        budget={budget}
        budgetIsEnabled={true}
        budgetIsValid={budgetIsValid}
        budgetSubmitted={budgetSubmitted}
        budgetChangeHandler={budgetChangeHandler}
        currency={currency}
        currencyChangeHandler={setCurrency}
        account={account}
        setAccount={setAccount}
        error={error}
        setError={setError}
      />

      {/* SUBMIT BUTTON */}
      {isLoading ? (
        <View style={styles.smallMarginTop}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitHandler()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default AddCurrency;
