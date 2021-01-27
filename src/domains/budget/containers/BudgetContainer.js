import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as categories from 'data/SpendingCategories';
import { AccountButton } from 'components';
import {
  BalanceDashboard,
  BudgetHistory,
  Chart,
  ChartTab,
  CurrencyPicker,
  OperationsForm,
  SectionHeader,
  SpendingCategories,
} from '../components';
import {
  ScrollView as Container,
  FloatingActionButton,
  ItemlessFrame,
  LoadingFrame,
} from 'utils';
import { fetchBudgetRequest, patchBudgetRequest } from 'actions/budgetActions';
import { prepareValue } from 'helpers';
import { styles } from './BudgetContainerStyle';

const BudgetContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tripId } = route.params;
  let keyboardRef = useRef();
  const budget = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).budget,
  );

  // $todo: index instead of "selectedCurrency" - choose currencyIndex
  // budget[currencyIndex],
  // budget[currencyIndex].value,
  // budget[currencyIndex].defaultAccount
  const [currencyIndex, setCurrencyIndex] = useState(0);
  // $todo: index instead of "selectedHistoryItem" - choose historyItemIndex
  // budget[currencyIndex].history[historyItemIndex],
  const [historyItemIndex, setHistoryItemIndex] = useState(0);
  const [category, setCategory] = useState('general');
  const [account, setAccount] = useState(
    Array.isArray(budget) && budget[0] ? budget[0].defaultAccount : 'card',
  );
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const chooseCategory = (iconPressed) =>
    setCategory(
      Object.keys(categories.categoryIcons).find(
        (key) => categories.categoryIcons[key] === iconPressed,
      ),
    );

  const modifyAmount = ({ title, cost, type }) => {
    /* const changedCurrency = selectedCurrency;

    type === 'plus'
      ? (setDisplayableValue(displayableValue + Math.abs(prepareValue(cost))),
        (changedCurrency.value =
          changedCurrency.value + Math.abs(prepareValue(cost))))
      : (setDisplayableValue(displayableValue + -Math.abs(prepareValue(cost))),
        (changedCurrency.value =
          changedCurrency.value - Math.abs(prepareValue(cost))));

    changedCurrency.history.push({
      account: account,
      category: category,
      date: new Date(),
      id: changedCurrency.history.length + 1,
      title: title,
      value:
        type === 'plus'
          ? Math.abs(prepareValue(cost))
          : -Math.abs(prepareValue(cost)),
    });

    try {
      persistBudget();
    } catch {
      setError('Something went wrong!');
    }

    const index = budget.findIndex((item) => item.id === selectedCurrency.id);
    budget[index] = changedCurrency; */
    console.log('title: ', title);
    console.log('type: ', type);
    console.log('cost: ', cost);
  };

  const deleteCurrency = useCallback(
    () => console.log('delete currency...'),
    /* async (id) => {
      setIsRefreshing(true);
      const filteredActiveCurrencies = budget.filter((item) => item.id !== id);
      await dispatch(patchBudgetRequest(tripId, filteredActiveCurrencies));
      budget !== undefined
        ? setSelectedCurrency(filteredActiveCurrencies[0])
        : setSelectedCurrency(null);
      setIsRefreshing(false);
    },
    [budget, dispatch, tripId], */
    [],
  );

  const handleSelectCurrency = (item) => {
    const currIndex = budget.findIndex((el) => el.id === item.id);
    setCurrencyIndex(currIndex);
    setAccount(item.defaultAccount);
  };

  const handleAddCurrency = () =>
    navigation.navigate('Add currency', {
      tripId,
    });

  const handleDeleteCurrency = (id) =>
    Alert.alert(
      'Are you sure?',
      'Delete currency.',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => {
            deleteCurrency(id);
          },
          text: 'Delete',
        },
      ],
      { cancelable: true },
    );

  /* const persistBudget = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(patchBudgetRequest(tripId, budget));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [budget, dispatch, tripId]); */

  const loadBudget = useCallback(() => {
    setIsLoading(true);
    try {
      dispatch(fetchBudgetRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    loadBudget();
  }, [loadBudget]);

  Keyboard.addListener('keyboardWillShow', () => {
    console.log('keyboard will show!');
  });

  Keyboard.addListener('keyboardWillHide', () => {
    console.log('keyboard will hide!');
  });

  if (isLoading) return <LoadingFrame />;

  if (budget === undefined || (Array.isArray(budget) && budget.length === 0))
    return (
      <>
        <ItemlessFrame>There is no budget to show!</ItemlessFrame>
        <FloatingActionButton
          onPress={() => navigation.navigate('Add currency', { tripId })}
          disabled={isLoading}
          loading={isLoading}
        />
      </>
    );

  return (
    <>
      <Container contentContainerStyle={styles.detailsContainer}>
        {budget[currencyIndex] &&
          Array.isArray(budget[currencyIndex].history) &&
          budget[currencyIndex].history.length > 1 && (
            <>
              <Chart
                getValue={(index) => budget[currencyIndex].history[index].value}
                data={budget[currencyIndex].history}
                onDataPointClick={(item) =>
                  setHistoryItemIndex(budget[currencyIndex].history[item.index])
                }
              />
              {!!historyItemIndex && (
                <ChartTab
                  date={budget[currencyIndex].history[historyItemIndex].date}
                  title={budget[currencyIndex].history[historyItemIndex].title}
                  value={budget[currencyIndex].history[historyItemIndex].value}
                />
              )}
            </>
          )}

        <View style={styles.operationsContainer}>
          <SectionHeader>Operations</SectionHeader>

          <View style={styles.operationsContent}>
            <SpendingCategories
              category={category}
              chooseCategory={chooseCategory}
            />

            <View style={styles.operationsSection}>
              <Text style={styles.label}>Accounts</Text>
              <View style={styles.accountsContainer}>
                <AccountButton
                  setAccount={setAccount}
                  value="cash"
                  icon="cash"
                  account={account}
                >
                  Cash
                </AccountButton>

                <AccountButton
                  setAccount={setAccount}
                  value="card"
                  icon="credit-card"
                  account={account}
                >
                  Card
                </AccountButton>
              </View>
            </View>

            <OperationsForm onSubmit={modifyAmount} />
          </View>

          <View style={styles.historyContainer}>
            <SectionHeader>History</SectionHeader>
            <BudgetHistory history={budget[currencyIndex].history} />
          </View>
        </View>
      </Container>

      <BalanceDashboard currency={budget[currencyIndex]} />
      <CurrencyPicker
        currencies={budget}
        selectedCurrency={budget[currencyIndex]}
        handleSelectCurrency={handleSelectCurrency}
        handleDeleteCurrency={handleDeleteCurrency}
        handleAddCurrency={handleAddCurrency}
      />
    </>
  );
};

export default BudgetContainer;
