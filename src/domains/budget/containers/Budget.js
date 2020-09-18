import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import * as budgetActions from 'budget/state/Actions';
import HeaderButton from 'components/headerButton/HeaderButton';
import Card from 'components/card/Card';
import {budgetStyle as styles} from './BudgetStyle';
import Colors from 'constants/Colors';

/** DIMENSIONS */
const screenWidth = Dimensions.get('window').width;

const Budget = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const activeCurrencies = selectedTrip.budget;

  const categories = {
    general: 'all-inclusive',
    communication: 'phone',
    eatingOut: 'silverware-fork-knife',
    transport: 'airplane',
    shopping: 'shopping',
    health: 'heart-pulse',
    gifts: 'gift',
    home: 'home',
    sports: 'dumbbell',
    sightSeeing: 'camera',
    entertainment: 'beer',
    savings: 'wallet',
  };

  const categoryNames = {
    general: 'General',
    communication: 'Communication',
    eatingOut: 'Eating out',
    transport: 'Transport',
    shopping: 'Shopping',
    health: 'Health',
    gifts: 'Gifts',
    home: 'For home',
    sports: 'Sports',
    sightSeeing: 'Sight-seeing',
    entertainment: 'Entertainment',
    savings: 'Savings',
  };

  const icons = Object.values(categories);

  const [selectedCurrency, setSelectedCurrency] = useState(
    !!activeCurrencies ? activeCurrencies[0] : undefined,
  );
  const [displayableValue, setDisplayableValue] = useState(
    selectedCurrency ? selectedCurrency.value : null,
  );
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [amountIsValid, setAmountIsValid] = useState(false);
  const [category, setCategory] = useState('general');
  const [account, setAccount] = useState('card');
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(
    !!selectedCurrency ? selectedCurrency.history[0] : null,
  );

  /** LINE CHARTS VARIABLES AND HANDLERS */
  const prepareLabels = () => {
    // extract dates from history attribute of selectedCurrency
    let labels = selectedCurrency.history.map((item) =>
      item.date.toString().split(' ').splice(1, 2).join(' '),
    );

    return labels;
  };

  const prepareData = () => {
    // extract values from history attribute of selectedCurrency and parse it into int
    let dataToPrepare = selectedCurrency.history.map((item) =>
      parseInt(item.value, 10),
    );
    // add initial value to preparedData
    let preparedData = [dataToPrepare[0]];
    // 'reduce' to get an array of budget after each operation
    dataToPrepare.reduce((total, num) => {
      preparedData.push(total + num);
      return total + num;
    });

    return preparedData;
  };

  const data = {
    labels: selectedCurrency ? prepareLabels() : [],
    datasets: [
      {
        data: selectedCurrency ? prepareData() : [],
        color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Budget value'],
  };

  const chartConfig = {
    backgroundGradientFrom: Colors.cards,
    backgroundGradientFromOpacity: 0.0,
    backgroundGradientTo: Colors.cards,
    backgroundGradientToOpacity: 0.9,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  /** HANDLERS */
  const clear = () => {
    setTitle('');
    setAmount('');
  };

  const chooseCategory = (iconPressed) => {
    setCategory(
      Object.keys(categories).find((key) => categories[key] === iconPressed),
    );
  };

  const calculateCard = () => {
    let cardAmount = 0;
    let cardHistory = selectedCurrency.history.filter(
      (item) => item.account === 'card',
    );
    cardHistory.map((item) => (cardAmount += parseInt(item.value, 10)));

    return cardAmount;
  };

  const calculateCash = () => {
    let cashAmount = 0;
    let cashHistory = selectedCurrency.history.filter(
      (item) => item.account === 'cash',
    );
    cashHistory.map((item) => (cashAmount += parseInt(item.value, 10)));

    return cashAmount;
  };

  const deleteCurrency = useCallback(
    async (id) => {
      setIsRefreshing(true);
      // update selectedCurrency in activeCurrencies
      const filteredActiveCurrencies = activeCurrencies.filter(
        (item) => item.id !== id,
      );
      await dispatch(
        budgetActions.updateBudget(tripId, filteredActiveCurrencies),
      );
      setSelectedCurrency(
        activeCurrencies !== undefined
          ? filteredActiveCurrencies[0]
          : undefined,
      );
      setIsRefreshing(false);
    },
    [activeCurrencies, dispatch, tripId],
  );

  let amountRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const amountChangeHandler = (text) => {
    text.trim().length === 0 || !amountRegex.test(text)
      ? setAmountIsValid(false)
      : setAmountIsValid(true);
    setAmount(text);
  };

  const modifyAmount = (typeOfOperation) => {
    if (title && amount && amountIsValid) {
      const changedCurrency = selectedCurrency;
      // modification control flow
      if (typeOfOperation === 'plus') {
        // change displayableValue
        setDisplayableValue(displayableValue + Math.abs(parseInt(amount, 10)));
        // modify selectedCurrency
        changedCurrency.value =
          changedCurrency.value + Math.abs(parseInt(amount, 10));
        changedCurrency.history.push({
          id: changedCurrency.history.length + 1,
          title: title,
          value: Math.abs(parseInt(amount, 10)),
          category: category,
          account: account,
          date: new Date(),
        });
        // update budget
        updateBudget();
      } else if (typeOfOperation === 'minus') {
        // change displayableValue
        setDisplayableValue(displayableValue + -Math.abs(parseInt(amount, 10)));
        // modify selectedCurrency
        changedCurrency.value =
          changedCurrency.value - Math.abs(parseInt(amount, 10));
        changedCurrency.history.push({
          id: changedCurrency.history.length + 1,
          title: title,
          value: -Math.abs(parseInt(amount, 10)),
          category: category,
          account: account,
          date: new Date(),
        });
        // update budget
        updateBudget();
      } else {
        setError('Something went wrong...');
      }
      // update selectedCurrency in activeCurrencies
      const index = activeCurrencies.findIndex(
        (item) => item.id === selectedCurrency.id,
      );
      activeCurrencies[index] = changedCurrency;
      // clear placeholders
      clear();
    } else {
      setError('Enter correct amount and title.');
    }
  };

  /* HANDLERS */
  const updateBudget = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(budgetActions.updateBudget(tripId, activeCurrencies));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [activeCurrencies, dispatch, tripId]);

  // fetch budget
  const loadBudget = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(budgetActions.fetchBudget(tripId));
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadBudget().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBudget]);

  if (isLoading || isRefreshing) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (activeCurrencies !== undefined) {
    return (
      <View style={styles.contentContainer}>
        {/* HORIZONTAL FLATLIST OF CURRENCIES */}
        <View style={styles.currenciesContainer}>
          <FlatList
            horizontal
            data={activeCurrencies}
            ItemSeparatorComponent={() => <View style={{width: 7}} />}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.currencyHolder}
                onLongPress={() => {
                  Alert.alert(
                    'Are you sure?',
                    'Delete currency.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => {
                          deleteCurrency(item.id);
                        },
                      },
                    ],
                    {cancelable: true},
                  );
                }}
                onPress={() => {
                  setSelectedCurrency(item);
                  setDisplayableValue(item.value);
                  setTitle('');
                  setAmount('');
                }}>
                <Text
                  style={
                    selectedCurrency.currency === item.currency
                      ? styles.currencyActive
                      : styles.currencyNonactive
                  }>
                  {item.currency}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        {/* CURRENCY OPERATIONS AND HISTORY */}
        {!!selectedCurrency && (
          <View style={styles.overviewContainer}>
            {/* AMOUNT OF CURRENCY */}
            <View style={styles.valueCard}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'grey'}}>General balance</Text>
                {/* GENERAL BALANCE */}
                <Text
                  style={[
                    styles.icon,
                    displayableValue < 0 ? styles.negative : styles.positive,
                  ]}>
                  {displayableValue < 0 ? '-' : '+'}
                  {displayableValue}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'grey'}}>Accounts balance</Text>
                {/* ACCOUNTS BALANCE */}
                <View style={[styles.accounts]}>
                  {/* CARD */}
                  <View style={[styles.accounts, {marginRight: '5%'}]}>
                    <Icon
                      name={'credit-card'}
                      style={[styles.label, styles.text, {marginRight: '5%'}]}
                    />
                    <Text
                      style={[
                        styles.label,
                        calculateCard() < 0 ? styles.negative : styles.positive,
                      ]}>
                      {calculateCard()}
                    </Text>
                  </View>
                  {/* CASH */}
                  <View style={styles.accounts}>
                    <Icon
                      name={'cash'}
                      style={[styles.icon, styles.text, {marginRight: '5%'}]}
                    />
                    <Text
                      style={[
                        styles.label,
                        calculateCash() < 0 ? styles.negative : styles.positive,
                      ]}>
                      {calculateCash()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        {!!selectedCurrency && (
          <ScrollView contentContainerStyle={styles.detailsContainer}>
            {/* LINECHART */}
            {selectedCurrency.history.length > 1 && (
              <View>
                <View style={[styles.smallMarginTop, styles.chartContainer]}>
                  <LineChart
                    data={data}
                    width={screenWidth * 0.9}
                    height={220}
                    chartConfig={chartConfig}
                    fromZero={true}
                    onDataPointClick={(item) =>
                      setSelectedHistoryItem(
                        selectedCurrency.history[item.index],
                      )
                    }
                    getDotColor={(item, index) =>
                      selectedCurrency.history[index].value < 0
                        ? '#b20000'
                        : 'green'
                    }
                  />
                </View>
                {!!selectedHistoryItem && (
                  <View
                    style={[
                      styles.smallMarginTop,
                      {
                        backgroundColor:
                          selectedHistoryItem.value < 0 ? '#b20000' : 'green',
                        padding: 15,
                        borderRadius: 20,
                      },
                    ]}>
                    <Text style={styles.text}>
                      {new Date(selectedHistoryItem.date).toLocaleDateString()}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.text, {fontSize: 22}]}>
                        {selectedHistoryItem.value}
                      </Text>
                      <Text style={[styles.text]}>
                        {selectedHistoryItem.title}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
            {/* OPERATIONS */}
            <View style={styles.smallMarginTop}>
              <Card style={{padding: '5%'}}>
                <Text style={[styles.text, styles.label]}>Operations</Text>
              </Card>
              <View style={{padding: '5%'}}>
                {/* CATEGORIES */}
                <View>
                  <Text style={{color: 'grey'}}>Categories</Text>
                  <View
                    style={[
                      styles.categoriesContainer,
                      styles.extraSmallMarginTop,
                    ]}>
                    {icons.map((item) => (
                      <TouchableOpacity
                        style={[styles.iconButton]}
                        onPress={() => chooseCategory(item)}>
                        <Icon
                          name={item}
                          style={[
                            styles.icon,
                            categories[category] === item
                              ? styles.activeCategory
                              : styles.nonactiveCategory,
                          ]}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.center}>
                    <Text style={[styles.activeCategory]}>
                      {categoryNames[category].toString()}
                    </Text>
                  </View>
                </View>
                {/* ACCOUNTS */}
                <View style={{marginVertical: '5%'}}>
                  <Text style={{color: 'grey'}}>Accounts</Text>
                  <View style={[styles.extraSmallMarginTop, styles.justifyRow]}>
                    {/* CASH */}
                    <View>
                      <TouchableOpacity
                        style={[styles.justifyRow, {alignItems: 'center'}]}
                        onPress={() => setAccount('cash')}>
                        <Icon
                          name={'cash'}
                          style={[
                            {marginRight: '5%'},
                            styles.icon,
                            account === 'cash'
                              ? styles.activeCategory
                              : styles.nonactiveCategory,
                          ]}
                        />
                        <Text
                          style={[
                            styles.label,
                            account === 'cash'
                              ? styles.activeCategory
                              : styles.nonactiveCategory,
                          ]}>
                          Cash
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* CARD */}
                    <View style={{marginLeft: '5%'}}>
                      <TouchableOpacity
                        style={[styles.justifyRow, {alignItems: 'center'}]}
                        onPress={() => setAccount('card')}>
                        <Icon
                          name={'credit-card'}
                          style={[
                            {marginRight: '5%'},
                            styles.icon,
                            account === 'card'
                              ? styles.activeCategory
                              : styles.nonactiveCategory,
                          ]}
                        />
                        <Text
                          style={[
                            styles.label,
                            account === 'card'
                              ? styles.activeCategory
                              : styles.nonactiveCategory,
                          ]}>
                          Card
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* AMOUNT INPUT */}
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    placeholderTextColor="grey"
                    value={amount}
                    onChangeText={(number) => amountChangeHandler(number)}
                    keyboardType={'numeric'}
                  />
                  <View style={[styles.justifyRow, styles.actions]}>
                    {/* PLUS OPERATION */}
                    <TouchableOpacity onPress={() => modifyAmount('plus')}>
                      <Icon
                        style={[styles.icon, styles.positive]}
                        name="plus"
                      />
                    </TouchableOpacity>
                    {/* MINUS OPERATION */}
                    <TouchableOpacity onPress={() => modifyAmount('minus')}>
                      <Icon
                        style={[styles.icon, styles.negative]}
                        name="minus"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* TITLE INPUT */}
                {/* <Text style={styles.text}>Operations</Text> */}
                <View style={styles.extraSmallMarginTop}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor="grey"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                  />
                </View>
                {!!error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.error}>{error}</Text>
                  </View>
                )}
              </View>
            </View>
            {/* HISTORY */}
            <View style={styles.smallMarginTop}>
              <Card style={{padding: '5%'}}>
                <Text style={[styles.text, styles.label]}>History</Text>
              </Card>
              {/* OPERATIONS */}
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
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: '5%',
                          }}>
                          <Icon
                            name={categories[item.category]}
                            style={[
                              styles.icon,
                              styles.text,
                              {marginRight: '10%'},
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
                                item.value < 0
                                  ? styles.negative
                                  : styles.positive
                              }>
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
          </ScrollView>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.budgetlessContainer}>
          <Text style={[styles.text, styles.budgetlessText]}>
            There is no budget to show!
          </Text>
          <Text style={[styles.text, styles.budgetlessText]}>
            Create a currency card with the
          </Text>
          <Icon name={'plus'} size={32} style={[styles.text, {margin: 10}]} />
          <Text style={[styles.text, styles.budgetlessText]}>sign above!</Text>
        </View>
      </View>
    );
  }
};

export const budgetOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a currency card"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add currency', {
              tripId: navData.route.params.tripId,
              currentBudget: navData.route.params.budget,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Budget;
