import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { RecommendationItemHeader } from 'domains/accommodation/components';
import { Card, ReadMore } from 'utils';
import { Colors } from 'constants';
import { styles } from './RecommendationItemStyle';

const RecommendationItem = ({ data }) => {
  return (
    <Card style={styles.accommodation}>
      <ScrollView>
        <RecommendationItemHeader image={data.image} />

        <View style={styles.alignRow}>
          <View style={styles.details}>
            <Text style={[styles.text, styles.destination]}>
              {props.destination}
            </Text>
            {props.startDate === props.endDate ? (
              <Text style={[styles.text, styles.date]}>{props.startDate}</Text>
            ) : (
              <Text style={[styles.text, styles.date]}>
                {props.startDate} - {props.endDate}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default RecommendationItem;
