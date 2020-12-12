import React from 'react';
import {View, ScrollView, FlatList, Platform, Animated} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Itemless from 'components/frames/itemless/Itemless';
import {AccommodationItem} from 'domains/accommodation/components';
import HeaderButton from 'components/headerButton/HeaderButton';
import {cardWidth} from 'domains/accommodation/components/AccommodationItem/AccommodationItemStyle';
import {styles} from './AccommodationContainerStyle';

import {DUMMY_HOTELS as accommodation} from 'accommodation/data/DummyHotels';

const AccommodationContainer = () => {
  if (accommodation === undefined) {
    return <Itemless message={'You have no saved accommodation!'} />;
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
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
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
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return <Animated.View key={i} style={{opacity, ...styles.dot}} />;
        })}
      </View>
    </ScrollView>
  );
};

export const accommodationOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add accommodation', {
              tripId: navData.route.params.tripId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default AccommodationContainer;
