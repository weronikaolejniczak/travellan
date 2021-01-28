import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {
  createRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as accommodationActions from 'actions/accommodationActions';
import {
  ActionSheet,
  FloatingActionButton,
  ItemlessFrame,
  LoadingFrame,
} from 'utils';
import { HotelCard, PDFModal } from 'components';
import { styles } from './AccommodationContainerStyle';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.923;
const actionSheetRef = createRef();

const AccommodationContainer = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { tripId } = route.params;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const accommodation = useSelector(
    (state) =>
      state.trips.trips.find((item) => item.id === tripId).accommodation,
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedAccomodationId, setSelectedAccomodationId] = useState(' ');

  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, cardWidth);

  const navigateToScreen = (screen) => {
    actionSheetRef.current?.hide();
    navigation.navigate(screen, {
      destination: selectedTrip.destination,
      endDate: selectedTrip.endDate,
      latitude: selectedTrip.region.latitude,
      longitude: selectedTrip.region.longitude,
      startDate: selectedTrip.startDate,
      tripId,
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
        'Are you sure?',
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

  const persistDelete = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(accommodationActions.deleteAccommodationRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const handleHotelDelete = (id) => {
    setIsRefreshing(true);
    Alert.alert(
      'Delete saved hotel?',
      'Are you sure?',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => persistDelete(id),
          text: 'OK',
        },
      ],
      { cancelable: true },
    );
    setIsRefreshing(false);
  };

  const handleHotelEdit = (id) => {
    navigation.navigate('Edit accommodation', {
      PDF: id.PDF,
      accomodationId: id,
      amenities: id.amenities,
      breakfast: id.breakfast,
      checkInExtra: id.checkInExtra,
      checkInHours: id.checkInHours,
      checkOutHours: id.checkOutHours,
      creditCardPaymentPossible: id.creditCardPaymentPossible,
      description: id.description,
      frontDesk24H: id.frontDesk24H,
      image: id.image,
      location: id.location,
      name: id.name,
      phone: id.phone,
      reservationDetails: id.reservationDetails,
      tripId,
    });
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
      <>
        <ItemlessFrame>You have no accomodation saved!</ItemlessFrame>
        <FloatingActionButton
          loading={isLoading}
          disabled={isLoading}
          onPress={() => actionSheetRef.current?.setModalVisible()}
        />
        <ActionSheet
          ref={actionSheetRef}
          elements={[
            {
              id: '0',
              label: 'Add hotel by name',
              onPress: () => navigateToScreen('Add hotel by name'),
            },
            {
              id: '1',
              label: 'Hotel recommendation',
              onPress: () => navigateToScreen('Hotel recommendation'),
            },
          ]}
        />
      </>
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
            handleHotelDelete={() => handleHotelDelete(data.item.id)}
            handleHotelEdit={() => handleHotelEdit(data.item.id)}
            {...data.item}
          />
        )}
      />
      <View style={styles.dotsWrapper}>
        {accommodation.map((_, i) => {
          let opacity = position.interpolate({
            extrapolate: 'clamp',
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
          });

          return <Animated.View key={i} style={{ opacity, ...styles.dot }} />;
        })}
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => actionSheetRef.current?.setModalVisible()}
        >
          <Icon name="plus" style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        elements={[
          {
            id: '0',
            label: 'Add hotel by name',
            onPress: () => navigateToScreen('Add hotel by name'),
          },
          {
            id: '1',
            label: 'Hotel recommendation',
            onPress: () => navigateToScreen('Hotel recommendation'),
          },
        ]}
      />
    </ScrollView>
  );
};
export default memo(AccommodationContainer);
