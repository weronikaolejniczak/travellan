import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import * as transportActions from 'actions/transportActions';
import { PDFModal } from 'components';
import {
  ErrorFrame,
  FloatingActionButton,
  ItemlessFrame,
  LoadingFrame,
} from 'utils';
import { QRModal, TransportItem } from '../components';
import { cardWidth } from '../components/TransportItem/TransportItemStyle';
import { styles } from './TransportContainerStyle';

const TransportContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tripId } = route.params;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const transport = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).transport,
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedTransportId, setSelectedTransportId] = useState(' ');

  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, cardWidth);

  const handlePressQR = useCallback(
    (QR, id) => {
      if (QR === undefined || QR === ' ' || QR === null || QR === '') {
        addQR(id);
      } else {
        openQRModal(id);
      }
    },
    [addQR, openQRModal],
  );

  const handlePressPDF = useCallback(
    (PDF, id) => {
      if (PDF === undefined || PDF === ' ' || PDF === null || PDF === '') {
        Alert.alert(
          'Add a ticket PDF?',
          'Attach document to the ticket.',
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

  const addQR = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        navigation.navigate('Add QR', {
          ticketId: id,
          tripId: tripId,
        });
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [navigation, tripId],
  );

  const addPDF = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        const temp = res.uri;
        await dispatch(transportActions.addPDFRequest(tripId, id, temp));
      } catch (err) {
        if (!DocumentPicker.isCancel(err)) {
          throw err;
        }
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const openQRModal = useCallback((id) => {
    setSelectedTransportId(id);
    setIsQRModalOpen(true);
  }, []);

  const openPDFModal = useCallback((id) => {
    setSelectedTransportId(id);
    setIsPDFModalOpen(true);
  }, []);

  const findTransportQR = (id) => {
    if (id === ' ') {
      return transport[0].QR;
    } else {
      const index = transport.findIndex((item) => item.id === id);
      return transport[index].QR;
    }
  };

  const findTransportPDF = (id) => {
    if (id === ' ') {
      const pdf = transport[0].PDF;
      const source = { uri: pdf };
      return source;
    } else {
      const index = transport.findIndex((item) => item.id === id);
      const pdf = transport[index].PDF;
      const source = { uri: pdf };
      return source;
    }
  };

  const handleQRDelete = useCallback(
    (items) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete QR code',
        'Are you sure?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => persistDeleteQR(items),
            text: 'OK',
          },
        ],
        { cancelable: true },
      );
      setIsRefreshing(false);
    },
    [persistDeleteQR],
  );

  const persistDeletePDF = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(transportActions.deletePDFRequest(tripId, id));
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

  const persistDeleteQR = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(transportActions.deleteQRRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
      setIsQRModalOpen(false);
    },
    [dispatch, tripId],
  );

  const handleDelete = useCallback(
    (noteId) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete saved ticket',
        'Are you sure?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => persistDelete(noteId),
            text: 'OK',
          },
        ],
        { cancelable: true },
      );
      setIsRefreshing(false);
    },
    [persistDelete],
  );

  const persistDelete = useCallback(
    (id) => {
      setIsRefreshing(true);
      setSelectedTransportId(' ');
      try {
        dispatch(transportActions.deleteTransportRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const loadTransport = useCallback(() => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(transportActions.fetchTransportRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadTransport();
    setIsLoading(false);
  }, [loadTransport, isLoading]);

  if (!Array.isArray(transport) || isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (Array.isArray(transport) && transport.length < 1) {
    return (
      <>
        <ItemlessFrame>You have no transport saved!</ItemlessFrame>
        <FloatingActionButton
          loading={isLoading}
          disabled={isLoading}
          onPress={() => navigation.navigate('Add transport', { tripId })}
        />
      </>
    );
  }

  if (error) {
    return <ErrorFrame error={error} />;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <QRModal
          QR={findTransportQR(selectedTransportId)}
          handleDeleteQR={() => handleQRDelete(selectedTransportId)}
          handleCloseQR={() => setIsQRModalOpen(false)}
          isQRModalOpen={isQRModalOpen}
          handleError={() => setError(error)}
        />
        <PDFModal
          PDF={findTransportPDF(selectedTransportId)}
          handleDeletePDF={() => handlePDFDelete(selectedTransportId)}
          handleClosePDF={() => setIsPDFModalOpen(false)}
          isPDFModalOpen={isPDFModalOpen}
          handleError={() => setError(error)}
        />
        <FlatList
          onRefresh={loadTransport}
          refreshing={isRefreshing}
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
          data={transport}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(data) => (
            <TransportItem
              {...data.item}
              destination={selectedTrip.destination}
              handleDeleteTransport={() => handleDelete(data.item.id)}
              handlePressQR={() => handlePressQR(data.item.QR, data.item.id)}
              handlePressPDF={() => handlePressPDF(data.item.PDF, data.item.id)}
            />
          )}
        />
        <View style={styles.dotsWrapper}>
          {transport.map((_, i) => {
            const opacity = position.interpolate({
              extrapolate: 'clamp',
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
            });

            return <Animated.View key={i} style={{ opacity, ...styles.dot }} />;
          })}
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => {
              navigation.navigate('Add transport', {
                tripId,
              });
            }}
          >
            <Icon name="plus" style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransportContainer;
