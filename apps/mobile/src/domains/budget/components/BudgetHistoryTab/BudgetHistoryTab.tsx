import React, { memo } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as categories from 'data/SpendingCategories';
import { Card } from 'utils';
import { styles } from './BudgetHistoryTabStyle';

const BudgetHistoryTab = ({ item }) => (
  <Card style={styles.card}>
    <View style={styles.icons}>
      <Icon
        name={categories.categoryIcons[item.category]}
        style={styles.firstIcon}
      />
      <Icon
        name={item.account === 'card' ? 'credit-card' : 'cash'}
        style={styles.secondIcon}
      />
    </View>
    <View style={styles.content}>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()} at{' '}
        {new Date(item.date).toLocaleTimeString()}
      </Text>
      <View style={styles.info}>
        <Text style={item.value < 0 ? styles.negative : styles.positive}>
          {item.value}
        </Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  </Card>
);

export default memo(BudgetHistoryTab);
