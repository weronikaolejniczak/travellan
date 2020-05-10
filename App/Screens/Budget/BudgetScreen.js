import React from 'react';
import {ScrollView, Text} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import {budgetScreenStyle as styles} from './BudgetScreenStyle';

const BudgetScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.text}>Budget</Text>
    </ScrollView>
  );
};

export default BudgetScreen;
