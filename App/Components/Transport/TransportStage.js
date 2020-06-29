import React, {useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import {transportItemStyle as styles} from './TransportItemStyle';
import Colors from '../../Constants/Colors';
/* {
    id: 1,
    to: true,
    from: false,
    stages: [
      {
        id: 0,
        dateOfDeparture: '2021-02-14',
        hourOfDeparture: '2:35'
        fromPlace: 'Poznań Główny railway station, Dworcowa 2, 61-801 Poznań',
        dateOfArrival: '2021-02-13',
        hourOfArrival: '6:45',
        toPlace: "Gare Saint-Lazare, 13 Rue d'Amsterdam, 75008 Paris, France",
        means: 'train',
        details: {
          carriage: '13',
          seat: '61',
        },
      }
    ]
  }, */

const TransportStage = (props) => {
  const stage = props.stage;
  console.log(stage);

  /**
   * <Text style={[styles.subtitle]}>{props.index + 1}</Text>
   * 
   */
  return (
    <View style={{marginTop: 20}}>
      {/* <Text style={[styles.subtitle]}>{stage.means} ticket</Text> */}
      <View style={[styles.rowDirection]}>
        {/* ICONS AND LINES */}
        <View
          style={{
            marginRight: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* 1st NUMBER */}
          <TouchableOpacity style={[styles.counterContainer]}>
            <Text style={[styles.subtitle]}>{props.index + 1}</Text>
          </TouchableOpacity>
          {/* LINE */}
          <View
            style={{
              borderColor: Colors.primary,
              height: '80%',
              borderLeftWidth: 3,
            }}
          />
          {/* 2nd NUMBER */}
          <TouchableOpacity style={[styles.counterContainer]}>
            <Text style={[styles.subtitle]}>{props.index + 1}</Text>
          </TouchableOpacity>
        </View>

        {/* DEPARTURE */}
        <View>
          <View>
            <Text style={[styles.subtitle]}>Departure</Text>
            <View style={[styles.rowDirection, {margin: 10}]}>
              <View style={styles.item}>
                <Icon name="md-calendar" style={styles.icon} />
              </View>
              <View style={styles.item}>
                <Text style={[styles.text]}>
                  {stage.dateOfDeparture.toString()} {'\n'}
                  {stage.hourOfDeparture.toString()}
                </Text>
              </View>
            </View>

            <View style={[styles.rowDirection, {margin: 10}]}>
              <View style={styles.item}>
                <Icon name="md-arrow-round-down" style={styles.icon} />
              </View>
              <View style={styles.item}>
                <Text style={[styles.text]}>{stage.fromPlace}</Text>
              </View>
            </View>
          </View>

          {/* ARRIVAL */}
          <View style={{marginTop: 10}}>
            <Text style={[styles.subtitle]}>Arrival</Text>
            <View style={[styles.rowDirection, {margin: 10}]}>
              <View style={styles.item}>
                <Icon name="md-calendar" style={styles.icon} />
              </View>
              <View style={styles.item}>
                <Text style={[styles.text]}>
                  {stage.dateOfArrival.toString()} {'\n'}
                  {stage.hourOfArrival.toString()}
                </Text>
              </View>
            </View>

            <View style={[styles.rowDirection, {margin: 10}]}>
              <View style={styles.item}>
                <Icon name="md-arrow-round-forward" style={styles.icon} />
              </View>
              <View style={styles.item}>
                <Text style={[styles.text]}>{stage.toPlace}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransportStage;
