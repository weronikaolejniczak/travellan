import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import {transportItemStyle as styles, cardHeight} from './TransportItemStyle';
import Colors from '../../Constants/Colors';

/** TRANSPORT STAGE COMPONENT */
const TransportStage = (props) => {
  const stage = props.stage;

  return (
    <View>
      <View style={[styles.horizontalLine]} />
      <View style={[styles.rowDirection]}>
        {/* 1st COLUMN - ICONS AND LINES */}
        <View style={[styles.iconsAndLinesContainer]}>
          {/* 1st NUMBER */}
          <TouchableOpacity style={[styles.counterContainer]}>
            <Text style={[styles.subtitle]}>{props.index + 1}</Text>
          </TouchableOpacity>
          {/* LINE */}
          <View style={[styles.verticalLine]} />
          {/* TRANSPORT ICON */}
          <TouchableOpacity style={[styles.counterContainer]}>
            <Icon
              name={Platform.OS === 'android' ? 'md-train' : 'ios-train'}
              style={[styles.subtitle, {fontSize: 24}]}
            />
          </TouchableOpacity>
          {/* LINE */}
          <View style={[styles.verticalLine]} />
          {/* 2nd NUMBER */}
          <TouchableOpacity style={[styles.counterContainer]}>
            <Icon
              name={Platform.OS === 'android' ? 'md-more' : 'ios-more'}
              style={[styles.subtitle, {fontSize: 24}]}
            />
          </TouchableOpacity>
        </View>

        {/* 2nd COLUMN - DEPARTURE AND ARRIVAL*/}
        <View>
          {/* DEPARTURE */}
          <View>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Departure</Text>
            <View
              style={[
                styles.rowDirection,
                {
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginVertical: 10,
                },
              ]}>
              <Icon
                name={
                  Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'
                }
                style={styles.icon}
              />
              <Text style={[styles.text]}>
                {stage.dateOfDeparture.split(' ').slice(1, 4).join(' ')}
              </Text>
              <Icon
                name={Platform.OS === 'android' ? 'md-clock' : 'ios-clock'}
                style={[styles.icon, {marginLeft: 20}]}
              />
              <Text style={[styles.text]}>{stage.hourOfDeparture}</Text>
            </View>
            <Text style={[styles.text]}>{stage.fromPlace}</Text>
          </View>

          {/* ARRIVAL */}
          <View style={[{marginTop: cardHeight * 0.03}]}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Arrival</Text>
            <View
              style={[
                styles.rowDirection,
                {
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginVertical: 10,
                },]}>
              <Icon
                name={
                  Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'
                }
                style={styles.icon}
              />
              <Text style={[styles.text]}>
                {stage.dateOfArrival.split(' ').slice(1, 4).join(' ')}
              </Text>
              <Icon
                name={Platform.OS === 'android' ? 'md-clock' : 'ios-clock'}
                style={[styles.icon, {marginLeft: 20}]}
              />
              <Text style={[styles.text]}>{stage.hourOfArrival}</Text>
            </View>
            <Text style={[styles.text]}>{stage.toPlace}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransportStage;
