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
import AccommodationItem from '../../Components/Accommodation/AccommodationItem';
import {
  cardWidth,
  spacingForCardInset,
} from '../../Components/Accommodation/AccommodationItem';
import Colors from '../../Constants/Colors';

/**
 * ACCOMMODATION SCREEN
 */
const AccommodationScreen = (props) => {
  const trip = props.route.params.trip;
  const accommodation = trip.accommodationInfo;

  return (
    <ScrollView
      pagingEnabled
      snapToAlignment="center"
      contentInset={styles.contentInsetIOS}
      style={styles.scrollview}
      contentContainerStyle={styles.contentContainer}
      centerContent={true}>
      <View>
        {accommodation.length > 0 ? (
          <FlatList
            horizontal
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
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

/**
 * TODO:
 * refactor Fonts
 * refactor Metrics
 */
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

export default AccommodationScreen;
