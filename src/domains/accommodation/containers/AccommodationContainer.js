import React, { createRef, useCallback, useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as accommodationActions from 'actions/accommodationActions';
import SplashScreen from 'react-native-splash-screen';
import { ActionSheet, HeaderButton, ItemlessFrame, LoadingFrame } from 'utils';
import { HotelCard, PDFModal } from 'components';
import { styles } from './AccommodationContainerStyle';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.923;
const actionSheetRef = createRef();

const AccommodationContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, cardWidth);
  const accommodation = useSelector(
    (state) =>
      state.trips.trips.find((item) => item.id === tripId).accommodation,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedAccomodationId, setSelectedAccomodationId] = useState(' ');

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

  const handlePDFManagement = (id) => {
    // use: tripId, id
  };

  const handleNavigationToMap = (id) => {
    // use: tripId, id
  };

  const handleHotelEdit = (id) => {
    // use: tripId, id
  };

  const loadAccommodation = useCallback(() => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(accommodationActions.fetchAccommodationRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadAccommodation();
    SplashScreen.hide();
    setIsLoading(false);
  }, [loadAccommodation]);

  if (!Array.isArray(accommodation) || isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (Array.isArray(accommodation) && accommodation.length < 1) {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ItemlessFrame message="You have no accomodation saved!" />
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
              onPress: () => navigateToScreen('Add hotel by name '),
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
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PDFModal
        PDF={findAccomodationPDF(selectedAccomodationId)}
        handleDeletePDF={() => handlePDFDelete(selectedAccomodationId)}
        handleClosePDF={() => setIsPDFModalOpen(false)}
        isPDFModalOpen={isPDFModalOpen}
        handleError={() => setError(error)}
      />
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
        snapToInterval={cardWidth + 10}
        snapToAlignment="center"
        contentInset={styles.contentInsetIOS}
        data={accommodation}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) => (
          <HotelCard
            inAccommodationListing
            cardStyle={styles.accommodation}
            handlePDFManagement={() => handlePDFManagement(data.item.id)}
            handleNavigationToMap={() => handleNavigationToMap(data.item.id)}
            handleHotelEdit={() => handleHotelEdit(data.item.id)}
            {...data.item}
          />
        )}
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
            onPress: () => navigateToScreen('Add hotel by name '),
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
