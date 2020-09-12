import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Switch from 'components/switch/Switch';

const BudgetField = (props) => {
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
          {/* refactor into autocomplete */}
          <TextInput
            style={props.styles.input}
            placeholder={'Currency'}
            placeholderTextColor="grey"
            value={props.currency}
            onChangeText={props.currencyChangeHandler}
          />
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
