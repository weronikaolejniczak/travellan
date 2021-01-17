import React from 'react';
import { Text, View } from 'react-native';

import { AccountButton } from 'components';
import { Autocomplete, Switch, TextInput } from 'utils';
import { CURRENCIES } from 'data/Currencies';
import { Layout } from 'constants';
import { styles } from './BudgetPickerStyle';

const BudgetField = ({
  account,
  budget,
  budgetChangeHandler,
  budgetIsEnabled,
  budgetIsValid,
  budgetSubmitted,
  currency,
  currencyChangeHandler,
  error,
  label,
  setAccount,
  showSwitch,
  toggleBudgetSwitch,
}) => {
  const query = currency;

  const filterCurrencies = (input, currencies) => {
    const regex = new RegExp(`${input.trim()}`, 'i');
    if (query === '') {
      return [];
    } else {
      const filtered = currencies.filter(
        (curr) => curr.name.search(regex) >= 0 || curr.iso.search(regex) >= 0,
      );
      return filtered.splice(0, 6);
    }
  };

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  const filteredCurrencies = filterCurrencies(query, CURRENCIES);

  const data =
    filteredCurrencies.length >= 1 && comp(query, filteredCurrencies[0].name)
      ? []
      : filteredCurrencies;

  return (
    <View style={styles.budgetPickerWrapper}>
      <View style={showSwitch ? Layout.fillRowCross : {}}>
        {showSwitch && (
          <Switch onToggleSwitch={toggleBudgetSwitch} toggled={budgetIsEnabled}>
            <Text style={styles.label}>{label}</Text>
          </Switch>
        )}
      </View>

      {budgetIsEnabled && (
        <>
          <TextInput
            label="Amount"
            value={budget}
            onChange={budgetChangeHandler}
            keyboardType="numeric"
          />

          <View style={Layout.fillRowCross}>
            <AccountButton
              account={account}
              value="cash"
              icon="cash"
              setAccount={setAccount}
            >
              Cash
            </AccountButton>
            <AccountButton
              value="card"
              account={account}
              icon="credit-card"
              setAccount={setAccount}
            >
              Cash
            </AccountButton>
          </View>

          <Autocomplete
            data={data}
            query={query}
            error={error}
            onChange={currencyChangeHandler}
            onPress={(item) => currencyChangeHandler(item.name)}
            keyExtractor={(item) => item.iso.toString()}
            textInputLabel="Currency"
            itemLabel={(item) => `${item.name} (${item.iso})`}
          />
        </>
      )}
    </View>
  );
};

export default BudgetField;
