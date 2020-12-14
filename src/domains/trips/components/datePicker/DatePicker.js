import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { datePickerStyle as styles } from './DatePickerStyle';

const DatePicker = (props) => {
  return (
    <View style={props.styles.bigMarginTop}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={props.showDatePicker} style={styles.picker}>
          <View style={styles.textContainer}>
            <Icon
              name="calendar"
              style={props.styles.icon}
            />
            <Text style={styles.pickerText}>
              {props.date.toString().split(' ').slice(1, 4).join(' ')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {props.showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={props.date}
          minimumDate={props.minimumDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={props.dateChangeHandler}
        />
      )}
    </View>
  );
};

export default DatePicker;
