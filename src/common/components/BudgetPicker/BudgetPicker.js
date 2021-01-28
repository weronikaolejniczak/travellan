import React, { memo } from 'react';
import { View } from 'react-native';

import { AccountButton } from 'components';
import { Autocomplete, Caption, Switch, Text, TextInput } from 'utils';
import { Layout } from 'constants';
import { styles } from './BudgetPickerStyle';

const BudgetPicker = ({
  data,
  query,
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
}) => (
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
          error={currencyError}
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

export default memo(BudgetPicker);
