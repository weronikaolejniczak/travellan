import React, { createRef } from 'react';
import { Animated, FlatList, ScrollView, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { AccommodationItem } from 'domains/accommodation/components';
import { HeaderButton, ItemlessFrame } from 'utils';
import { cardWidth } from 'domains/accommodation/components/AccommodationItem/AccommodationItemStyle';
import { styles } from './AccommodationContainerStyle';

import { DUMMY_HOTELS as accommodation } from 'data/DummyHotels';

import { ActionSheet } from '../../../utils';

const actionSheetRef = createRef();

const AccommodationContainer = (props) => {
  const { navigation, route } = props;

  const navigateToScreen = (screen) => {
    actionSheetRef.current?.hide();
    navigation.navigate(screen, {
      cityCode: route.params.cityCode,
      destination: route.params.destination,
      endDate: route.params.endDate,
      startDate: route.params.startDate,
      tripId: route.params.tripId,
    });
  };

  if (accommodation === undefined) {
    return <ItemlessFrame message="You have no saved accommodation!" />;
  }

  let scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, cardWidth);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        decelerationRate={0}
        snapToInterval={cardWidth + 20}
        snapToAlignment="center"
        contentInset={styles.contentInsetIOS}
        data={accommodation}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) => <AccommodationItem data={data.item} />}
      />
      <View style={styles.rowDirection}>
        {accommodation.map((_, i) => {
          let opacity = position.interpolate({
            extrapolate: 'clamp',
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
          });

          return <Animated.View key={i} style={{ opacity, ...styles.dot }} />;
        })}
      </View>
      <ActionSheet
        ref={actionSheetRef}
        elements={[
          {
            id: '0',
            label: 'Add accommodation manually',
            onPress: () => navigateToScreen('Add accommodation'),
          },
          {
            id: '1',
            label: 'Add hotel by name',
            onPress: () => navigateToScreen('Add hotel by name'),
          },
          {
            id: '2',
            label: 'Hotel recommendation',
            onPress: () => navigateToScreen('Hotel recommendation'),
          },
        ]}
      />
    </ScrollView>
  );
};

export const accommodationOptions = (navData) => ({
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Create an accommodation"
        iconName="plus"
        onPress={() => actionSheetRef.current?.setModalVisible()}
      />
    </HeaderButtons>
  ),
});

export default AccommodationContainer;
