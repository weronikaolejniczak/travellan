'use strict';

import React, {useCallback, useState} from 'react';

import {
  View,
  //AppRegistry,
  //StyleSheet,
  Text,
  TouchableOpacity,
  //Linking,
  ActivityIndicator,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
//import code from 'react-native-aztec-qrcode';
//import {RNCamera} from 'react-native-camera';
import {AddQRStyle as styles} from './AddQRStyle';
import {useDispatch, useSelector} from 'react-redux';

import * as transportActions from 'transport/state/Actions';

const AddQR = (props) => {
  const dispatch = useDispatch();

  const tripId = props.route.params.tripId;
  const ticketId = props.route.params.ticketId;
  const [QR, setQR] = useState('');
  // Loading check.
  const [isLoading, setIsLoading] = useState(false);

  const qrHandler = async (e) => {
    setIsLoading(true);
    setQR(e.data);
    const qr = e.data;
    await dispatch(transportActions.updateTransport(tripId, ticketId, qr));
    props.navigation.navigate('Transport'),
      {
        tripId: tripId,
      };
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        style={styles.centered}
        onRead={qrHandler}
        /**TO ADD FLASHLIGHT SWITCH BUTTON */
        //flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>{QR}</Text>
            {QR ? <QRCode value={QR} /> : null}
          </Text>
        }
        bottomContent={
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Track Ticket's QR-code</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
};

export default AddQR;
