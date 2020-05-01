/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import TripItem from '../../Components/MyTrips/TripItem'


const TripsOverviewScreen = (props) => {
  const trips = useSelector((state) => state.trips.availableTrips);
  return (
    <View style={{backgroundColor: '#333333', flex: 1}}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TripItem
            image={itemData.item.imageUrl}
            destination={itemData.item.destination}
            startDate={itemData.item.startDate}
            endDate={itemData.item.endDate}
            onViewDetail={() => {}}
            deleteTrip={() => {}}
          />
        )}
      />
    </View>
  );
};

export default TripsOverviewScreen;
