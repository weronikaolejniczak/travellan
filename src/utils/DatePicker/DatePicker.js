import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './DatePickerStyle';

const DatePicker = (props) => {
  const {
    date,
    dateChangeHandler,
    label,
    minimumDate,
    showDatePicker,
    showDate,
  } = props;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.picker}>
          <View style={styles.textContainer}>
            <Icon name="calendar" />
            <Text style={styles.pickerText}>
              {date.toString().split(' ').slice(1, 4).join(' ')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          minimumDate={minimumDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={dateChangeHandler}
        />
      )}
    </View>
  );
};

export default DatePicker;
