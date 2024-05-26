import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { patchBudgetRequest } from 'actions/budgetActions';
import { BudgetPicker } from 'components';
import { CURRENCIES } from 'data/Currencies';
import { compareStrings, prepareValue } from 'helpers';
import BudgetModel from 'models/Budget';
import { Button, ScrollView as Container } from 'utils';

/* const incorrectCurrency =
  'There is no such currency or the currency already exists in your budget.'; */

const AddCurrencyContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const currentBudget = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).budget,
  );

  const [budgetValue, setBudgetValue] = useState('');
  const [budgetValueError, _setBudgetValueError] = useState('');
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('');
  const [currencyError, _setCurrencyError] = useState('');
  const [account, setAccount] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // $todo: refactor filter function to utility
  const filterCurrencies = (input, currs) => {
    const inputRegex = new RegExp(`${input.trim()}`, 'i');
    return currency === ''
      ? []
      : currs
          .filter(
            (curr) =>
              curr.name.search(inputRegex) >= 0 ||
              curr.iso.search(inputRegex) >= 0,
          )
          .splice(0, 6);
  };

  const filteredCurrencies = filterCurrencies(currency, CURRENCIES);

  const currencyData =
    filteredCurrencies.length >= 1 &&
    compareStrings(currency, filteredCurrencies[0].name)
      ? []
      : filteredCurrencies;
  // $end

  const submitHandler = useCallback(async () => {
    setBudgetSubmitted(true);
    if (!budgetValueError && !currencyError) {
      const newCurrency = BudgetModel({
        id: new Date().toString(),
        value: prepareValue(budgetValue),
        currency:
          CURRENCIES.filter((item) => item.name === currency).length > 0
            ? CURRENCIES.filter(
                (item) => item.name === currency,
              )[0]?.iso.toString()
            : undefined,
        history: [
          {
            account: account.toString(),
            category: '',
            date: new Date(),
            id: 0,
            title: 'Initial budget',
            value: prepareValue(budgetValue),
          },
        ],
        defaultAccount: account.toString(),
      });

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
    budgetValueError,
    currencyError,
    error,
    budgetValue,
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
        data={currencyData}
        query={currency}
        label="Initial value"
        budget={budgetValue}
        budgetIsEnabled
        budgetValueError={budgetValueError}
        budgetSubmitted={budgetSubmitted}
        handleBudgetValueChange={setBudgetValue}
        currency={currency}
        handleCurrencyChange={setCurrency}
        account={account}
        currencyError={currencyError}
        setAccount={setAccount}
      />

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default memo(AddCurrencyContainer);
