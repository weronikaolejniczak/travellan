import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import {RNCamera} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as transportActions from 'actions/transportActions';
import {styles} from './AddQRContainerStyle';
import Colors from 'constants/Colors';

const AddQRContainer = (props) => {
  const dispatch = useDispatch();

  const tripId = props.route.params.tripId;
  const ticketId = props.route.params.ticketId;

  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  var qr = props.qr;

  const [QR, setQR] = useState('');
  const [showQRscanner, setshowQRscanner] = useState(true);
  const [torchOn, settorchOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const qrHandler = (e) => {
    setQR(e.data);
    setshowQRscanner(false);
  };

  const acceptHandler = useCallback(async () => {
    setIsLoading(true);
    qr = {QR};
    qr = qr.QR;
    await dispatch(transportActions.updateQR(tripId, ticketId, qr));
    props.navigation.navigate('Transport', {
      tripId: selectedTrip.id,
    });
    setIsLoading(false);
  }, [dispatch, qr, props.navigation, QR, tripId, ticketId]);

  const redoHandler = () => {
    setshowQRscanner(true);
  };
  const switchLight = () => {
    settorchOn(!torchOn);
  };

  return (
    <View style={styles.container}>
      {showQRscanner && (
        <QRCodeScanner
          style={styles.centered}
          onRead={qrHandler}
          flashMode={
            torchOn
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          topContent={
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={switchLight}>
              <MaterialIcon name={'flashlight'} style={styles.icon} />
            </TouchableOpacity>
          }
          bottomContent={
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Track Ticket's QR-code</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      {!showQRscanner && (
        <View style={styles.container}>
          <QRCode style={styles.qrstyle} value={QR} size={300} logoSize={300} />
          <View style={styles.buttonContainerR}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={acceptHandler}>
                <MaterialIcon name={'check'} style={styles.icon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={redoHandler}>
              <MaterialIcon name={'close'} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddQRContainer;
