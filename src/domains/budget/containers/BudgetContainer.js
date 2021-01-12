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
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const budget = selectedTrip.budget;

  // $todo: index instead of "selectedCurrency" - choose currencyIndex
  // budget[currencyIndex],
  // budget[currencyIndex].value,
  // budget[currencyIndex].defaultAccount
  // $todo: index instead of "selectedCurrency" - choose historyItemIndex
  // budget[currencyIndex].history[historyItemIndex],
  const [selectedCurrency, setSelectedCurrency] = useState(
    budget === undefined ? undefined : budget[0],
  );
  const [displayableValue, setDisplayableValue] = useState(
    selectedCurrency ? selectedCurrency.value : null,
  );
  const [category, setCategory] = useState('general');
  const [account, setAccount] = useState(
    selectedCurrency ? selectedCurrency.defaultAccount : 'card',
  );
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(
    selectedCurrency ? selectedCurrency.history[0] : null,
  );

  const chooseCategory = (iconPressed) => {
    setCategory(
      Object.keys(categories.categoryIcons).find(
        (key) => categories.categoryIcons[key] === iconPressed,
      ),
    );
  };

  const modifyAmount = ({ title, cost, type }) => {
    const changedCurrency = selectedCurrency;

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
    budget[index] = changedCurrency;
  };

  const deleteCurrency = useCallback(
    async (id) => {
      setIsRefreshing(true);
      const filteredActiveCurrencies = budget.filter((item) => item.id !== id);
      await dispatch(patchBudgetRequest(tripId, filteredActiveCurrencies));
      budget !== undefined
        ? setSelectedCurrency(filteredActiveCurrencies[0])
        : setSelectedCurrency(null);
      setIsRefreshing(false);
    },
    [budget, dispatch, tripId],
  );

  const handleSelectCurrency = (item) => {
    setSelectedCurrency(item);
    setDisplayableValue(item.value);
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

  const persistBudget = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(patchBudgetRequest(tripId, budget));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [budget, dispatch, tripId]);

  const loadBudget = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchBudgetRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, tripId]);

  useEffect(() => {
    setIsLoading(true);

    loadBudget().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBudget]);

  if (selectedCurrency === undefined || isLoading || isRefreshing)
    return <LoadingFrame />;

  if (budget === [] || budget === undefined)
    <ItemlessFrame message="There is no budget to show!" />;

  return (
    <Container>
      <CurrencyPicker
        currencies={budget}
        selectedCurrency={selectedCurrency}
        handleSelectCurrency={handleSelectCurrency}
        handleDeleteCurrency={handleDeleteCurrency}
      />
      <BalanceDashboard currency={selectedCurrency} />

      <ScrollView contentContainerStyle={styles.detailsContainer}>
        {selectedCurrency.history.length > 1 && (
          <>
            <Chart
              getValue={(index) => selectedCurrency.history[index].value}
              data={selectedCurrency.history}
              onDataPointClick={(item) =>
                setSelectedHistoryItem(selectedCurrency.history[item.index])
              }
            />
            {!!selectedHistoryItem && (
              <ChartTab
                date={selectedHistoryItem.date}
                title={selectedHistoryItem.title}
                value={selectedHistoryItem.value}
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
            <BudgetHistory history={selectedCurrency.history} />
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
