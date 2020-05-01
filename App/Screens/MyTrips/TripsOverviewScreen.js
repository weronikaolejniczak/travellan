/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import TripItem from '../../Components/MyTrips/TripItem';
import HeaderButton from '../../Components/UI/HeaderButton';

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

export const tripsScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Create a trip');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default TripsOverviewScreen;
