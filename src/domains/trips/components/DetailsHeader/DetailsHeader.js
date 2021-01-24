import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from 'constants';
import { styles } from './DetailsHeaderStyle';

const DetailsHeader = ({
  image,
  startDate,
  endDate,
  author,
  username,
  addTripToCalendar,
}) => {
  const extractDate = (date) =>
    new Date(date).toString().split(' ').splice(0, 3).join(' ');

  const extractHour = (date) =>
    `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;

  return (
    <ImageBackground style={styles.image} source={{ uri: image }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={addTripToCalendar}
        style={styles.calendarButton}
      >
        <Icon
          name="calendar-plus"
          onPress={addTripToCalendar}
          style={styles.calendarIcon}
        />
      </TouchableOpacity>
      <LinearGradient
        colors={[Colors.transparent, Colors.background]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        locations={[0.5, 1]}
        style={styles.linearGradient}
      >
        <View style={styles.infoContainer}>
          <View style={styles.dateContainer}>
            <View style={styles.dateBubble}>
              <Text style={styles.date}>{extractDate(startDate)}</Text>
              <Text style={[styles.header, styles.date]}>
                {extractHour(startDate)}
              </Text>
            </View>
            <Icon name="arrow-right" style={styles.icon} />
            <View style={styles.dateBubble}>
              <Text style={styles.date}>{extractDate(endDate)}</Text>
              <Text style={[styles.header, styles.date]}>
                {extractHour(endDate)}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[styles.text, styles.imageCredits]}>
          Photo by {author} @Unsplash/{username}
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
};

export default DetailsHeader;
