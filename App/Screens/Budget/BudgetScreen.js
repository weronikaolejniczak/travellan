import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/Atoms/Card';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';
import BUDGET from '../../Data/DummyBudget';

const BudgetScreen = (props) => {
  const activeCurrencies = BUDGET;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrencies[0]);
  const [displayableValue, setDisplayableValue] = useState(
    selectedCurrency.value,
  );
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  /** HANDLERS */
  const clear = () => {
    setTitle('');
    setAmount('');
  };

  const addToAmount = () => {
    console.log('title ' + title);
    console.log('add ' + Math.abs(amount));
    clear();
  };
  const subtractFromAmount = () => {
    console.log('title ' + title);
    console.log('subtract ' + Math.abs(amount));
    clear();
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
          <Card style={{alignItems: 'center', padding: 15}}>
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
          <View style={{marginTop: '10%'}}>
            <Text style={[styles.text, styles.label]}>Operations</Text>
            {/* TITLE INPUT */}
            <View style={{marginTop: '2%'}}>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                placeholderTextColor="grey"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            {/* AMOUNT INPUT */}
            <View style={{marginTop: '2%'}}>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor="grey"
                value={amount}
                onChangeText={(number) => setAmount(number)}
                keyboardType={'numeric'}
              />
              <View
                style={[
                  styles.justifyRow,
                  {
                    position: 'absolute', 
                    right: 0, 
                    justifyContent: 'center', 
                    marginTop: '2%',
                  },
                ]}>
                {/* PLUS OPERATION */}
                <TouchableOpacity onPress={() => addToAmount()}>
                  <Icon style={[styles.icon, styles.positive]} name="plus" />
                </TouchableOpacity>
                {/* MINUS OPERATION */}
                <TouchableOpacity onPress={() => subtractFromAmount()}>
                  <Icon style={[styles.icon, styles.negative]} name="minus" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* HISTORY */}
          <View style={{marginVertical: '10%'}}>
            <Text style={[styles.text, styles.label]}>History</Text>
            {selectedCurrency.history
              .slice(0)
              .reverse()
              .map((item) => (
                <Card style={{marginTop: '5%', padding: 15}}>
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
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default BudgetScreen;
