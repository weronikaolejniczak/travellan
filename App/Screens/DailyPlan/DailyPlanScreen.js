import React from 'react';
import {ScrollView, Text} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import {dailyPlanScreenStyle as styles} from './DailyPlanScreenStyle';

const DailyPlanScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.text}>Daily plan</Text>
    </ScrollView>
  );
};

export default DailyPlanScreen;
