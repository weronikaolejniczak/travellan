import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
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
  const icons = Object.values(categories);

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrencies[0]);
  const [displayableValue, setDisplayableValue] = useState(
    selectedCurrency.value,
  );
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('communication');
  const [account, setAccount] = useState('card');

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
    labels: prepareLabels(),
    datasets: [
      {
        data: prepareData(),
        color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Budget value'], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: Colors.background,
    backgroundGradientFromOpacity: 0.0,
    backgroundGradientTo: Colors.primary,
    backgroundGradientToOpacity: 0.1,
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

  const modifyAmount = (typeOfOperation) => {
    if (title && amount) {
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
      } else {
        console.log('error regarding addition/subtraction');
      }
      // update selectedCurrency in activeCurrencies
      const index = activeCurrencies.findIndex(
        (item) => item.id === selectedCurrency.id,
      );
      activeCurrencies[index] = changedCurrency;
      // clear placeholders
      clear();
    } else {
      console.log('enter title and amount');
    }
  };

  /* HANDLERS
  const loadReservations = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(accommodationActions.fetchReservations(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadReservations().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadReservations]);

  if (isLoading || isRefreshing) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (accommodation === undefined) {
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.itemlessContainer, styles.columnAndRowCenter]}>
          <Text style={[styles.text, styles.itemlessText]}>
            There are no reservations!
          </Text>
          <Text style={[styles.text, styles.itemlessText]}>
            Add one with the
          </Text>
          <Icon name="md-add" size={32} style={[styles.text, styles.icon]} />
          <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
        </View>
      </ScrollView>
    );
  } */

  return (
    <View style={styles.contentContainer}>
      {/* HORIZONTAL FLATLIST OF CURRENCIES */}
      <View style={styles.currenciesContainer}>
        <FlatList
          horizontal
          data={activeCurrencies}
          ItemSeparatorComponent={() => (
            <Icon style={[styles.text, styles.icon]} name="power-on" />
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.currencyHolder}
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
      {selectedCurrency && (
        <View style={styles.detailsContainer}>
          {/* AMOUNT OF CURRENCY */}
          <Card style={styles.valueCard}>
            {/* ACCOUNTS BALANCE */}
            <View style={[styles.justifyRow]}>
              {/* GENERAL BALANCE */}
              <View style={[styles.justifyRow, {marginRight: '12%'}]}>
                <Text style={[styles.label, styles.text]}>Total:{'   '}</Text>
                <Text
                  style={[
                    styles.label,
                    displayableValue < 0 ? styles.negative : styles.positive,
                  ]}>
                  {displayableValue}
                </Text>
              </View>
              {/* CARD */}
              <View style={styles.justifyRow}>
                <Icon
                  name={'credit-card'}
                  style={[styles.label, styles.text, {marginRight: '10%'}]}
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
              <View style={styles.justifyRow}>
                <Icon
                  name={'cash'}
                  style={[styles.label, styles.text, {marginRight: '10%'}]}
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
          </Card>
        </View>
      )}
      {selectedCurrency && (
        <ScrollView contentContainerStyle={styles.detailsContainer}>
          {/* OPERATIONS */}
          <View style={styles.extraSmallMarginTop}>
            <Text style={[styles.text, styles.label, {marginBottom: '4%'}]}>
              Operations
            </Text>
            <Card style={{padding: '5%'}}>
              {/* CATEGORIES */}
              <View>
                <Text style={styles.text}>Categories</Text>
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
                <View style={[styles.justifyRow, styles.center]}>
                  <Text style={[styles.text]}>chosen: </Text>
                  <Text style={[styles.activeCategory]}>{category}</Text>
                </View>
              </View>
              {/* ACCOUNTS */}
              <View style={{marginVertical: '5%'}}>
                <Text style={styles.text}>Accounts</Text>
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
              {/* TITLE INPUT */}
              <Text style={styles.text}>Operations</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter title"
                  placeholderTextColor="grey"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
              {/* AMOUNT INPUT */}
              <View style={styles.extraSmallMarginTop}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  placeholderTextColor="grey"
                  value={amount}
                  onChangeText={(number) => setAmount(number)}
                  keyboardType={'numeric'}
                />
                <View style={[styles.justifyRow, styles.actions]}>
                  {/* PLUS OPERATION */}
                  <TouchableOpacity onPress={() => modifyAmount('plus')}>
                    <Icon style={[styles.icon, styles.positive]} name="plus" />
                  </TouchableOpacity>
                  {/* MINUS OPERATION */}
                  <TouchableOpacity onPress={() => modifyAmount('minus')}>
                    <Icon style={[styles.icon, styles.negative]} name="minus" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
          {/* HISTORY */}
          <View style={styles.bigMarginTop}>
            <Text style={[styles.text, styles.label]}>History</Text>
            {/* LINECHART */}
            {selectedCurrency.history.length > 1 && (
              <View style={[styles.smallMarginTop, styles.chartContainer]}>
                <LineChart
                  data={data}
                  width={screenWidth * 0.9}
                  height={220}
                  chartConfig={chartConfig}
                  fromZero={true}
                  onDataPointClick={(item) =>
                    console.log(selectedCurrency.history[item.index])
                  }
                />
              </View>
            )}
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
                      <View style={{marginRight: '10%'}}>
                        <Icon
                          name={categories[item.category]}
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
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Budget;
