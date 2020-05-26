import React from 'react';
import {View, ScrollView, Text, FlatList, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/UI/HeaderButton';
import AccommodationItem from '../../Components/Accommodation/AccommodationItem';
import {cardWidth} from '../../Components/Accommodation/AccommodationItemStyle';
import {accommodationScreenStyle as styles} from './AccommodationScreenStyle';

/** ACCOMMODATION SCREEN - displays stored reservations
 * TODO:
 * refactor inline styles
 * refactor repeated itemless screen (for all other screens as well)
 */
const AccommodationScreen = (props) => {
  const trip = props.route.params.trip;
  const accommodation = trip.accommodationInfo;
  console.log(accommodation);

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.contentContainer}>
      <View>
        {accommodation !== undefined ? (
          <FlatList
            horizontal
            pagingEnabled
            decelerationRate={0}
            snapToInterval={cardWidth + 20} // REFACTOR THIS NUMBER TO BE RESPONSIVE
            snapToAlignment="center"
            contentInset={styles.contentInsetIOS}
            data={accommodation}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <AccommodationItem
                id={itemData.item.id}
                name={itemData.item.name}
                address={itemData.item.address}
                image={itemData.item.imageUrl}
                description={itemData.item.description}
              />
            )}
          />
        ) : (
          <View style={[styles.itemlessContainer, styles.columnAndRowCenter]}>
            <Text style={[styles.text, styles.itemlessText]}>
              There are no reservations!
            </Text>
            <Text style={[styles.text, styles.itemlessText]}>
              Add one with the
            </Text>
            <Icon name="md-add" size={32} style={[styles.text, styles.icon]} />
            <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export const accommodationScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add accommodation', {
              tripId: navData.route.params.trip.id,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default AccommodationScreen;
