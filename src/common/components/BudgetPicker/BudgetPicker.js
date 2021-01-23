import React, { useEffect } from 'react';
import { View } from 'react-native';

import { AccountButton } from 'components';
import { Autocomplete, Caption, Switch, Text, TextInput } from 'utils';
import { CURRENCIES } from 'data/Currencies';
import { Layout } from 'constants';
import { styles } from './BudgetPickerStyle';

const BudgetPicker = ({
  account,
  budget,
  handleBudgetValueChange,
  budgetIsEnabled,
  budgetSubmitted,
  budgetValueError,
  currency,
  handleCurrencyChange,
  currencyError,
  label,
  setAccount,
  showSwitch,
  toggleBudgetSwitch,
  scrollToBottom,
}) => {
  const query = currency;

  const filterCurrencies = (input, currencies) => {
    const inputRegex = new RegExp(`${input.trim()}`, 'i');
    return query === ''
      ? []
      : currencies
          .filter(
            (curr) =>
              curr.name.search(inputRegex) >= 0 ||
              curr.iso.search(inputRegex) >= 0,
          )
          .splice(0, 6);
  };

  const filteredCurrencies = filterCurrencies(query, CURRENCIES);

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  const data =
    filteredCurrencies.length >= 1 && comp(query, filteredCurrencies[0].name)
      ? []
      : filteredCurrencies;

  useEffect(() => {
    if (filteredCurrencies.length > 0) scrollToBottom();
  }, [filteredCurrencies, scrollToBottom]);

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
          <View style={styles.accountsWrapper}>
            <Caption>Default account</Caption>
            <View style={styles.accounts}>
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
                Card
              </AccountButton>
            </View>
          </View>

          <TextInput
            label="Amount"
            value={budget}
            error={budgetValueError}
            onChange={handleBudgetValueChange}
            keyboardType="numeric"
          />

          <Autocomplete
            data={data}
            query={query}
            error={currencyError} // $fix
            onChange={handleCurrencyChange}
            onPress={(item) => handleCurrencyChange(item.name)}
            keyExtractor={(item) => item.iso.toString()}
            textInputLabel="Currency"
            itemLabel={(item) => `${item.name} (${item.iso})`}
          />
        </>
      )}
    </View>
  );
};

export default BudgetPicker;
