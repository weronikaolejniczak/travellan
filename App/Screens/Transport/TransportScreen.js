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
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import HeaderButton from '../../Components/UI/HeaderButton';
import TransportItem from '../../Components/Transport/TransportItem';
import {
  cardWidth,
  spacingForCardInset,
} from '../../Components/Transport/TransportItem';
import Colors from '../../Constants/Colors';

/**
 * TRANSPORT SCREEN
 */
const TransportScreen = (props) => {
  const trip = props.route.params.trip;
  const transport = trip.transportInfo;

  return (
    <ScrollView
      pagingEnabled
      snapToAlignment="center"
      contentInset={styles.contentInsetIOS}
      style={styles.scrollview}
      contentContainerStyle={styles.contentContainer}
      centerContent={true}>
      <View>
        {transport.length > 0 ? (
          <FlatList
            horizontal
            decelerationRate={0}
            snapToInterval={cardWidth + 20} // REFACTOR THIS NUMBER TO BE RESPONSIVE
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
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? spacingForCardInset : 0,
  },
  contentInsetIOS: {
    top: 0,
    left: spacingForCardInset,
    bottom: 0,
    right: spacingForCardInset,
  },
  columnAndRowCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
  },
  itemlessText: {
    fontSize: 20,
  },
  icon: {
    margin: 10,
  },
});

export default TransportScreen;
