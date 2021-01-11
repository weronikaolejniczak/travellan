import React, { memo } from 'react';
import { Text, View } from 'react-native';

import BudgetHistoryTab from '../BudgetHistoryTab/BudgetHistoryTab';
import { styles } from './BudgetHistoryStyle';

const BudgetHistory = ({ history }) =>
  Array.isArray(history) && history.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.text}>No operations to show</Text>
    </View>
  ) : (
    history
      .slice(0)
      .reverse()
      .map((item) => <BudgetHistoryTab item={item} />)
  );

export default memo(BudgetHistory);
