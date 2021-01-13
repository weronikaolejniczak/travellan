import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Budget from 'models/Budget';
import { BudgetPicker } from 'components';
import { Button, ScrollView as Container } from 'utils';
import { CURRENCIES } from 'data/Currencies';
import { patchBudgetRequest } from 'actions/budgetActions';
import { prepareValue } from 'helpers';

const incorrectCurrency =
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
    const currencyISO =
      CURRENCIES.filter((item) => item.name === text)[0] !== undefined
        ? CURRENCIES.filter((item) => item.name === text)[0].iso
        : undefined;

    const exists = CURRENCIES.filter((item) => item.name === text).length > 0;

    const isAlreadyDeclared =
      currentBudget !== undefined
        ? currentBudget.filter((item) => item.currency === currencyISO).length >
          0
        : false;

    const validator = exists && !isAlreadyDeclared;

    validator ? setCurrencyIsValid(true) : setCurrencyIsValid(false);
    validator ? setError(null) : setError(incorrectCurrency);
    setCurrency(text);
  };

  const budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
    !(!budgetRegex.test(text) || text.trim().length === 0)
      ? setBudgetIsValid(true)
      : setBudgetIsValid(false);
    setBudget(text);
  };

  const submitHandler = useCallback(async () => {
    setBudgetSubmitted(true);
    if (budgetIsValid && currencyIsValid) {
      const newCurrency = new Budget(
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

      const budgetToSubmit = currentBudget
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
        setError('Something went wrong!');
      }
    } else if (!error) {
      setError('Something went wrong!');
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

  // $todo: refactor validation with Formik
  // $todo: is keyboardShouldPersistTaps necessary?
  return (
    <Container keyboardShouldPersistTaps="always">
      <BudgetPicker
        label="Enter initial value"
        showSwitch={false}
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

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default memo(AddCurrencyContainer);
