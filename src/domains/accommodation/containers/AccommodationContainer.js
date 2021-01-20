import React, { createRef, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as accommodationActions from 'actions/accommodationActions';
import DocumentPicker from 'react-native-document-picker';
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

  const handlePDFManagement = useCallback(
    (PDF, id) => {
      if (PDF === undefined || PDF === ' ' || PDF === null || PDF === '') {
        Alert.alert(
          'Add an accomodation document?',
          'Attach document to the accomodation.',
          [
            {
              style: 'cancel',
              text: 'Cancel',
            },
            {
              onPress: () => addPDF(id),
              text: 'OK',
            },
          ],
          { cancelable: true },
        );
      } else {
        openPDFModal(id);
      }
    },
    [addPDF, openPDFModal],
  );

  const addPDF = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        const temp = res.uri;
        await dispatch(accommodationActions.addPDFRequest(tripId, id, temp));
      } catch (err) {
        if (!DocumentPicker.isCancel(err)) throw err;
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const openPDFModal = useCallback((id) => {
    setSelectedAccomodationId(id);
    setIsPDFModalOpen(true);
  }, []);

  const findAccomodationPDF = (id) => {
    if (id === ' ') {
      let pdf = accommodation[0].PDF;
      let source = { uri: pdf };
      return source;
    } else {
      const index = accommodation.findIndex((item) => item.id === id);
      let pdf = accommodation[index].PDF;
      let source = { uri: pdf };
      return source;
    }
  };
  const persistDeletePDF = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(accommodationActions.deletePDFRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
      setIsPDFModalOpen(false);
    },
    [dispatch, tripId],
  );

  const handlePDFDelete = useCallback(
    (items) => {
      setIsRefreshing(true);
      Alert.alert(
        'Unlink the document',
        'Are you sure? (Do not worry, the operation will not delete the document from your device)',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => persistDeletePDF(items),
            text: 'OK',
          },
        ],
        { cancelable: true },
      );
      setIsRefreshing(false);
    },
    [persistDeletePDF],
  );

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
            handlePDFManagement={() =>
              handlePDFManagement(data.item.PDF, data.item.id)
            }
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
