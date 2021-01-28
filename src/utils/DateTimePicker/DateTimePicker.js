import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './DateTimePickerStyle';

const CustomDateTimePicker = (props) => {
  const {
    adjustDate,
    date,
    label,
    minimumDate,
    setShowPicker,
    setDate,
    showPicker,
  } = props;
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    adjustDate && adjustDate(currentDate);

    if (mode === 'date') {
      setMode('time');
      toggleDatePicker();
    } else {
      setMode('date');
    }
  };

  const toggleDatePicker = () => setShowPicker(true);

  const formatDate = () =>
    `${date
      .toString()
      .split(' ')
      .slice(1, 4)
      .join(' ')}, ${date
      .toString()
      .split(' ')
      .slice(1, 5)[3]
      .split(':')
      .slice(0, 2)
      .join(':')}`;

  return (
    <>
      <TouchableOpacity onPress={toggleDatePicker} style={styles.picker}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.text}>{formatDate()}</Text>
        </View>
        <Icon style={styles.icon} name="calendar" />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          minimumDate={minimumDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default memo(CustomDateTimePicker);
