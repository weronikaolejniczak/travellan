import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../../app/constants/Colors';

// Trim a string.
const trim = (string) => string.split(' ').slice(1, 4).join(' ');

const AssignmentStage = (props) => {
  return (
    <View style={styles.bigMarginTop}>
      <Text style={[styles.label, styles.text]}>Add to:</Text>
      <View style={styles.smallMarginTop}>
        <FlatList
          data={props.trips}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <TouchableOpacity
              onPress={() => props.process(item.id)}
              style={[
                styles.button,
                /* {
                backgroundColor: props.tripIds.includes(item.id)
                  ? Colors.primary
                  : Colors.transparent,
              }, */
              ]}>
              <Text style={styles.text}>
                {item.destination} ({trim(item.startDate)} -{' '}
                {trim(item.endDate)})
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  text: {
    color: Colors.text,
  },
  smallMarginTop: {
    marginTop: '2%',
  },
  bigMarginTop: {
    marginTop: '5%',
  },
});

export default AssignmentStage;
