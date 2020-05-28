import React from 'react';
import {View, ScrollView, Text, FlatList, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/UI/HeaderButton';
import TransportItem from '../../Components/Transport/TransportItem';
import {cardWidth} from '../../Components/Transport/TransportItemStyle';
import {transportScreenStyle as styles} from './TransportScreenStyle';

/** TRANSPORT SCREEN - displays stored transport tickets
 * TODO:
 * refactor inline styles
 * refactor values to be responsive
 * refactor repeated itemless screen
 */
const TransportScreen = (props) => {
  const trip = props.route.params.trip;
  const transport = trip.transportInfo;

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.contentContainer}>
      <View>
        {transport !== undefined ? (
          <FlatList
            horizontal
            pagingEnabled
            decelerationRate={0}
            snapToInterval={cardWidth + 20}
            snapToAlignment="center"
            contentInset={styles.contentInsetIOS}
            data={transport}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TransportItem
                id={itemData.item.id}
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
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={[styles.text, styles.itemlessText]}>
              There are no tickets!
            </Text>

            <Text style={[styles.text, styles.itemlessText]}>
              Add one with the
            </Text>

            <Icon name="md-add" size={32} style={[styles.text, {margin: 10}]} />

            <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
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
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add transport', {
              tripId: navData.route.params.tripId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default TransportScreen;
