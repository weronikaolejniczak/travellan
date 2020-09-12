import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Switch from 'components/switch/Switch';
import {budgetFieldStyle as styles} from './BudgetFieldStyle';
import {CURRENCIES} from 'data/Currencies';

const BudgetField = (props) => {
  const query = props.currency;

  const filterCurrencies = (input, currencies) => {
    const regex = new RegExp(`${input.trim()}`, 'i');
    if (query === '') {
      return [];
    } else {
      const filtered = currencies.filter(
        (curr) => curr.name.search(regex) >= 0,
      );
      return filtered.splice(0, 6);
    }
  };

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  const filteredCurrencies = filterCurrencies(query, CURRENCIES);

  return (
    <View style={props.styles.bigMarginTop}>
      <View style={props.showSwitch ? props.styles.rowAndCenter : {}}>
        <Text style={props.styles.label}>{props.label}</Text>
        {props.showSwitch && (
          <Switch
            style={props.styles.switch}
            onValueChange={props.toggleBudgetSwitch}
            value={props.budgetIsEnabled}
          />
        )}
      </View>
      {props.budgetIsEnabled && (
        <View>
          <TextInput
            style={props.styles.input}
            placeholder={'Number'}
            placeholderTextColor="grey"
            value={props.budget}
            onChangeText={props.budgetChangeHandler}
            keyboardType={'numeric'}
          />
          {/* autocomplete currency */}
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              data={
                filteredCurrencies.length >= 1 &&
                comp(query, filteredCurrencies[0].name)
                  ? []
                  : filteredCurrencies
              }
              style={props.styles.input}
              inputContainerStyle={styles.input}
              defaultValue={query}
              listStyle={styles.result}
              placeholder="Currency"
              placeholderTextColor="grey"
              onChangeText={(text) => props.currencyChangeHandler(text)}
              keyExtractor={(item) => item.iso.toString()}
              renderItem={({item, i}) => (
                <TouchableOpacity
                  style={styles.result}
                  onPress={() => props.currencyChangeHandler(item.name)}>
                  <Text style={styles.text}>
                    {item.name} ({item.iso})
                  </Text>
                </TouchableOpacity>
              )}
            />
            {CURRENCIES.filter((item) => item.name === props.currency) > 1 && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>Enter correct currency name.</Text>
              </View>
            )}
          </View>
        </View>
      )}
      {/* validation error */}
      {props.budgetIsEnabled && !props.budgetIsValid && props.budgetSubmitted && (
        <View style={props.styles.errorContainer}>
          <Text style={props.styles.error}>Enter a valid budget!</Text>
        </View>
      )}
    </View>
  );
};

export default BudgetField;
