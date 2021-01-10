import React, { memo } from 'react';
import { View } from 'react-native';

import AccountBalance from '../AccountBalance/AccountBalance';
import GeneralBalance from '../GeneralBalance/GeneralBalance';
import { calculateCard, calculateCash } from 'helpers';
import { styles } from './BalanceDashboardStyle';

const BudgetDashboard = ({ currency }) => (
  <View style={styles.container}>
    <AccountBalance
      label="Cash"
      value={calculateCash(currency.history)}
      iconName="cash"
    />

    <GeneralBalance value={currency.value} />

    <AccountBalance
      label="Card"
      value={calculateCard(currency.history)}
      iconName="credit-card"
    />
  </View>
);

export default memo(BudgetDashboard);
