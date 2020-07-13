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
import {LineChart} from 'react-native-chart-kit';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/Atoms/HeaderButton';
import Card from '../../Components/Atoms/Card';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';
import BUDGET from '../../Data/DummyBudget';

/** SCREEN DIMENSIONS */
const screenWidth = Dimensions.get('window').width;

/** BUDGET SCREEN */
const BudgetScreen = (props) => {
  const activeCurrencies = BUDGET;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrencies[0]);
  const [displayableValue, setDisplayableValue] = useState(
    selectedCurrency.value,
  );
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  /** LINE CHARTS VARIABLES */
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  /** HANDLERS */
  const clear = () => {
    setTitle('');
    setAmount('');
  };

  const modifyAmount = (typeOfOperation) => {
    if (title && amount) {
      const changedCurrency = selectedCurrency;
      // modification control flow
      if (typeOfOperation === 'plus') {
        // change displayableValue
        setDisplayableValue(displayableValue + Math.abs(parseInt(amount, 10)));
        // modify selectedCurrency
        changedCurrency.value += Math.abs(parseInt(amount, 10));
        changedCurrency.history.push({
          id: changedCurrency.history.length + 1,
          title: title,
          value: amount,
        });
      } else if (typeOfOperation === 'minus') {
        // change displayableValue
        setDisplayableValue(displayableValue - Math.abs(parseInt(amount, 10)));
        // modify selectedCurrency
        changedCurrency.value -= Math.abs(parseInt(amount, 10));
        changedCurrency.history.push({
          id: changedCurrency.history.length + 1,
          title: title,
          value: '-' + amount,
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
            <Text
              style={[
                styles.label,
                displayableValue < 0 ? styles.negative : styles.positive,
              ]}>
              {displayableValue}
            </Text>
          </Card>
        </View>
      )}
      {selectedCurrency && (
        <ScrollView contentContainerStyle={styles.detailsContainer}>
          {/* OPERATIONS */}
          <View style={styles.bigMarginTop}>
            <Text style={[styles.text, styles.label]}>Operations</Text>
            {/* TITLE INPUT */}
            <View style={styles.smallMarginTop}>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                placeholderTextColor="grey"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            {/* AMOUNT INPUT */}
            <View style={styles.smallMarginTop}>
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
          </View>
          {/* HISTORY */}
          <View style={styles.bigMarginVertical}>
            <Text style={[styles.text, styles.label]}>History</Text>
            {/* LINECHART */}
            {!!selectedCurrency.history.length && (
              <View style={styles.smallMarginTop}>
                <LineChart
                  data={data}
                  width={screenWidth * 0.9}
                  height={220}
                  chartConfig={chartConfig}
                />
              </View>
            )}
            {/* OPERATIONS */}
            {!selectedCurrency.history.length ? (
              <View>
                <Text style={styles.text}>No operations to show</Text>
              </View>
            ) : (
              selectedCurrency.history
                .slice(0)
                .reverse()
                .map((item) => (
                  <Card style={styles.operationCard}>
                    <View style={[styles.justifyRow, styles.spaceBetween]}>
                      <Text
                        style={
                          item.value < 0 ? styles.negative : styles.positive
                        }>
                        {item.value}
                      </Text>
                      <Text style={styles.text}>{item.title}</Text>
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

export const budgetScreenOptions = (navData) => {
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

export default BudgetScreen;
