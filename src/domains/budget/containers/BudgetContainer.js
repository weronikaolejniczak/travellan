import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';

import * as categories from 'data/SpendingCategories';
import { AccountButton } from 'components';
import { BalanceDashboard, CurrencyPicker } from '../components';
import { Card, ItemlessFrame, LoadingFrame, TextInput } from 'utils';
import { Colors } from 'constants';
import { fetchBudgetRequest, patchBudgetRequest } from 'actions/budgetActions';
import {
  prepareDataForLinechart,
  prepareLabelsForLinechart,
  prepareValue,
} from 'helpers';
import { styles } from './BudgetContainerStyle';

const screenWidth = Dimensions.get('window').width;

const BudgetContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const budget = selectedTrip.budget;

  const [selectedCurrency, setSelectedCurrency] = useState(
    selectedTrip.budget === undefined ? undefined : selectedTrip.budget[0],
  );
  const [displayableValue, setDisplayableValue] = useState(
    selectedCurrency ? selectedCurrency.value : null,
  );
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [amountIsValid, setAmountIsValid] = useState(false);
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

  const data = {
    datasets: [
      {
        color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
        data: selectedCurrency
          ? prepareDataForLinechart(selectedCurrency.history)
          : [],
        strokeWidth: 2,
      },
    ],
    labels: selectedCurrency
      ? prepareLabelsForLinechart(selectedCurrency.history)
      : [],
    legend: ['Budget value'],
  };

  const chartConfig = {
    backgroundGradientFrom: Colors.cards,
    backgroundGradientFromOpacity: 0.0,
    backgroundGradientTo: Colors.cards,
    backgroundGradientToOpacity: 0.9,
    barPercentage: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  const clear = () => {
    setTitle('');
    setAmount('');
  };

  const chooseCategory = (iconPressed) => {
    setCategory(
      Object.keys(categories.categoryIcons).find(
        (key) => categories.categoryIcons[key] === iconPressed,
      ),
    );
  };

  const amountRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const amountChangeHandler = (text) => {
    text.trim().length === 0 || !amountRegex.test(text)
      ? setAmountIsValid(false)
      : setAmountIsValid(true);
    setAmount(text);
  };

  const modifyAmount = (type) => {
    if (title && amount && amountIsValid) {
      const changedCurrency = selectedCurrency;

      type === 'plus'
        ? (setDisplayableValue(
            displayableValue + Math.abs(prepareValue(amount)),
          ),
          (changedCurrency.value =
            changedCurrency.value + Math.abs(prepareValue(amount))))
        : (setDisplayableValue(
            displayableValue + -Math.abs(prepareValue(amount)),
          ),
          (changedCurrency.value =
            changedCurrency.value - Math.abs(prepareValue(amount))));

      changedCurrency.history.push({
        account: account,
        category: category,
        date: new Date(),
        id: changedCurrency.history.length + 1,
        title: title,
        value:
          type === 'plus'
            ? Math.abs(prepareValue(amount))
            : -Math.abs(prepareValue(amount)),
      });

      try {
        persistBudget();
      } catch {
        setError('Something went wrong!');
      }

      const index = budget.findIndex((item) => item.id === selectedCurrency.id);
      budget[index] = changedCurrency;
      clear();
    } else {
      setError('Enter correct amount and title.');
    }
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
    setTitle('');
    setAmount('');
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

  if (isLoading || isRefreshing) return <LoadingFrame />;

  if (budget === [] || budget === undefined)
    <ItemlessFrame message="There is no budget to show!" />;

  return (
    <View style={styles.contentContainer}>
      <CurrencyPicker
        currencies={budget}
        selectedCurrency={selectedCurrency}
        handleSelectCurrency={handleSelectCurrency}
        handleDeleteCurrency={handleDeleteCurrency}
      />

      <BalanceDashboard currency={selectedCurrency} />

      <ScrollView contentContainerStyle={styles.detailsContainer}>
        {/* statistics */}
        {selectedCurrency.history.length > 1 && (
          <View>
            {/* statistics chart */}
            <View style={[styles.smallMarginTop, styles.chartContainer]}>
              <LineChart
                data={data}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                fromZero={true}
                onDataPointClick={(item) =>
                  setSelectedHistoryItem(selectedCurrency.history[item.index])
                }
                getDotColor={(item, index) =>
                  selectedCurrency.history[index].value < 0
                    ? '#b20000'
                    : 'green'
                }
              />
            </View>

            {/* selected chart item - when you click on point on chart */}
            {!!selectedHistoryItem && (
              <View
                style={[
                  styles.smallMarginTop,
                  {
                    backgroundColor:
                      selectedHistoryItem.value < 0 ? '#b20000' : 'green',
                    borderRadius: 20,
                    padding: 15,
                  },
                ]}
              >
                <Text style={styles.text}>
                  {new Date(selectedHistoryItem.date).toLocaleDateString()}
                </Text>
                <View style={styles.selectedHistoryItemInfo}>
                  <Text style={[styles.text, { fontSize: 22 }]}>
                    {selectedHistoryItem.value}
                  </Text>
                  <Text style={[styles.text]}>{selectedHistoryItem.title}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.smallMarginTop}>
          {/* header */}
          <Card style={{ padding: '5%' }}>
            <Text style={[styles.text, styles.label]}>Operations</Text>
          </Card>

          {/* operations content */}
          <View style={{ padding: '5%' }}>
            {/* categories */}
            <View>
              <Text style={{ color: 'grey' }}>Categories</Text>
              <View
                style={[styles.categoriesContainer, styles.extraSmallMarginTop]}
              >
                {categories.icons.map((item) => (
                  <TouchableOpacity
                    style={[styles.iconButton]}
                    onPress={() => chooseCategory(item)}
                  >
                    <Icon
                      name={item}
                      style={[
                        styles.icon,
                        categories.categoryIcons[category] === item
                          ? styles.activeCategory
                          : styles.nonactiveCategory,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {/* chosen category */}
              <View style={styles.center}>
                <Text style={[styles.activeCategory]}>
                  {categories.categoryLabels[category].toString()}
                </Text>
              </View>
            </View>

            {/* choose account */}
            <View>
              <Text style={{ color: 'grey' }}>Accounts</Text>
              <View style={styles.justifyRow}>
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

            {/* fORM */}
            {/* inputs - use Formik validation */}
            <TextInput
              label="Title of transaction"
              value={title}
              onChange={(text) => setTitle(text)}
            />
            <TextInput
              label="Cost"
              value={amount}
              onChange={(number) => amountChangeHandler(number)}
              keyboardType="numeric"
            />

            {/* + and - round buttons
              onPress={() => modifyAmount('plus')}
              onPress={() => modifyAmount('minus')}
              */}
          </View>

          <View style={styles.smallMarginTop}>
            {/* history header */}
            <Card style={{ padding: '5%' }}>
              <Text style={[styles.text, styles.label]}>History</Text>
            </Card>

            {/* selected history currency item */}
            {!selectedCurrency.history.length ? (
              <View style={styles.smallMarginTop}>
                <Text style={styles.text}>No operations to show</Text>
              </View>
            ) : (
              selectedCurrency.history
                .slice(0)
                .reverse()
                .map((item) => (
                  <Card style={styles.operationCard}>
                    <View style={styles.justifyRow}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginRight: '5%',
                        }}
                      >
                        <Icon
                          name={categories.categoryIcons[item.category]}
                          style={[
                            styles.icon,
                            styles.text,
                            { marginRight: '10%' },
                          ]}
                        />
                        <Icon
                          name={
                            item.account === 'card' ? 'credit-card' : 'cash'
                          }
                          style={[styles.icon, styles.text]}
                        />
                      </View>
                      <View>
                        <Text style={styles.date}>
                          {new Date(item.date).toLocaleDateString()} at{' '}
                          {new Date(item.date).toLocaleTimeString()}
                        </Text>
                        <View style={[styles.justifyRow]}>
                          <Text
                            style={
                              item.value < 0 ? styles.negative : styles.positive
                            }
                          >
                            {item.value}
                            {'   '}
                          </Text>
                          <Text style={styles.text}>{item.title}</Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
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
