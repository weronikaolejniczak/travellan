/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Platform,
  StyleSheet,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
// imports from within the module
import HeaderButton from '../../Components/UI/HeaderButton';
import TransportItem from '../../Components/Transport/TransportItem';
import {
  CARD_WIDTH,
  SPACING_FOR_CARD_INSET,
} from '../../Components/Transport/TransportItem';

const TransportScreen = (props) => {
  const trip = props.route.params.trip;
  const transport = trip.transportInfo;

  return (
    <ScrollView
      pagingEnabled
      snapToAlignment="center"
      contentInset={{
        // iOS ONLY
        top: 0,
        left: SPACING_FOR_CARD_INSET,
        bottom: 0,
        right: SPACING_FOR_CARD_INSET,
      }}
      style={{backgroundColor: '#222222', flex: 1}}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal:
          Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
      }}
      centerContent={true}>
      <View>
        {transport.length > 0 ? (
          <FlatList
            horizontal
            decelerationRate={0}
            snapToInterval={CARD_WIDTH + 20} // REFACTOR THIS NUMBER TO BE RESPONSIVE
            snapToAlignment="center"
            contentInset={{
              // iOS ONLY
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            data={transport}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TransportItem
                means={itemData.item.means}
                to={itemData.item.to}
                destination={trip.destination}
                date={itemData.item.date}
                hour={itemData.item.hour}
                fromPlace={itemData.item.fromPlace}
                toPlace={itemData.item.toPlace}
              />
            )}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.text, styles.transportlessText]}>
              Add a ticket!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export const transportScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
  },
  transportlessText: {
    fontSize: 20,
  },
});

export default TransportScreen;
