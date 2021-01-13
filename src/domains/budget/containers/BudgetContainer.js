import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { View as Container, ItemlessFrame, LoadingFrame } from 'utils';
import { fetchBudgetRequest, patchBudgetRequest } from 'actions/budgetActions';
import { prepareValue } from 'helpers';
import { styles } from './BudgetContainerStyle';

const BudgetContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const budget = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).budget,
  );

  //console.log('budget: ', budget);

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
    //setSelectedCurrency(item);
    //setDisplayableValue(item.value);
    setAccount(item.defaultAccount);
  };

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

  if (isLoading) return <LoadingFrame />;

  if (budget === undefined || (Array.isArray(budget) && budget.length === 0))
    return <ItemlessFrame message="There is no budget to show!" />;

  return (
    <Container>
      <CurrencyPicker
        currencies={budget}
        selectedCurrency={budget[currencyIndex]}
        handleSelectCurrency={handleSelectCurrency}
        handleDeleteCurrency={handleDeleteCurrency}
      />
      <BalanceDashboard currency={budget[currencyIndex]} />

      <ScrollView contentContainerStyle={styles.detailsContainer}>
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

            <View>
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
      </ScrollView>
    </Container>
  );
};

export const budgetOptions = (navData) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() =>
          navData.navigation.navigate('Add currency', {
            tripId: navData.route.params.tripId,
          })
        }
      >
        <Text style={styles.navigationText}>Add currency</Text>
      </TouchableOpacity>
    ),
  };
};

export default BudgetContainer;
