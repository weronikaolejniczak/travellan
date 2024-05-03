import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
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
  ErrorFrame,
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
  const budget = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).budget,
  );

  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [historyItemIndex, setHistoryItemIndex] = useState(0);
  const [category, setCategory] = useState('general');
  const [account, setAccount] = useState(
    Array.isArray(budget) && budget[currencyIndex]
      ? budget[currencyIndex].defaultAccount
      : 'card',
  );
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const chooseCategory = (iconPressed) =>
    setCategory(
      Object.keys(categories.categoryIcons).find(
        (key) => categories.categoryIcons[key] === iconPressed,
      ),
    );

  const modifyAmount = async ({ title, cost, type }) => {
    setIsLoading(true);
    setError('');

    const newHistoryItem = {
      account: account,
      category: category,
      date: new Date(),
      id: budget[currencyIndex].history.length + 1,
      title: title,
      value:
        type === 'plus'
          ? Math.abs(prepareValue(cost))
          : -Math.abs(prepareValue(cost)),
    };

    const updatedBudget = [...budget];
    updatedBudget[currencyIndex].history = updatedBudget[
      currencyIndex
    ].history.concat(newHistoryItem);

    type === 'plus'
      ? (updatedBudget[currencyIndex].value =
          updatedBudget[currencyIndex].value + Math.abs(prepareValue(cost)))
      : (updatedBudget[currencyIndex].value =
          updatedBudget[currencyIndex].value - Math.abs(prepareValue(cost)));

    try {
      await dispatch(patchBudgetRequest(tripId, updatedBudget));
      setIsLoading(false);
    } catch {
      setError('Something went wrong!');
      setIsLoading(false);
    }
  };

  const deleteCurrency = useCallback(
    async (id) => {
      setIsLoading(true);
      const filteredCurrencies = budget.filter((item) => item.id !== id);
      await dispatch(patchBudgetRequest(tripId, filteredCurrencies));
      setIsLoading(false);
    },
    [budget, dispatch, setIsLoading, tripId],
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

  useEffect(() => {
    console.log(historyItemIndex);
  }, [historyItemIndex]);

  if (isLoading) {
    return <LoadingFrame />;
  }

  if (error) {
    return <ErrorFrame error={error} />;
  }

  if (budget === undefined || (Array.isArray(budget) && budget.length === 0)) {
    return (
      <>
        <ItemlessFrame>There is no budget to show!</ItemlessFrame>
        <FloatingActionButton
          onPress={handleAddCurrency}
          disabled={isLoading}
          loading={isLoading}
        />
      </>
    );
  }

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
                onDataPointClick={(item) => setHistoryItemIndex(item.index)}
              />
              <ChartTab
                date={budget[currencyIndex].history[historyItemIndex].date}
                title={budget[currencyIndex].history[historyItemIndex].title}
                value={budget[currencyIndex].history[historyItemIndex].value}
              />
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
