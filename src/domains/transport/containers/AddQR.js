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
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
//import code from 'react-native-aztec-qrcode';
import {RNCamera} from 'react-native-camera';
import {AddQRStyle as styles} from './AddQRStyle';
import {useDispatch, useSelector} from 'react-redux';
import Colors from 'constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as transportActions from 'transport/state/Actions';
//
import {NavigationEvents} from 'react-navigation';

const AddQR = (props) => {
  const dispatch = useDispatch();

  const tripId = props.route.params.tripId;
  const ticketId = props.route.params.ticketId;
  const [QR, setQR] = useState('');
  const [showQRscanner, setshowQRscanner] = useState(true);
  const [torchOn, settorchOn] = useState(false);
  // Loading check.
  const [isLoading, setIsLoading] = useState(false);

  const qrHandler = (e) => {
    //setIsLoading(true);
    setQR(e.data);
    //const qr = e.data;
    setshowQRscanner(false);
    //setIsLoading(false);
  };

  const acceptHandler = useCallback(async () => {
    //try {}
    setIsLoading(true);
    var qr = {QR};
    qr = qr.QR;
    await dispatch(transportActions.updateQR(tripId, ticketId, qr));
    //props.navigation.goBack(),
    props.navigation.navigate('Transport'),
      {
        tripId: tripId,
      };
    setIsLoading(false);
  }, [QR, tripId, ticketId, dispatch, props.navigation]);
  const redoHandler = () => {
    //console.log({QR});
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
          /**TO ADD FLASHLIGHT SWITCH BUTTON */
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
      )}
      {!showQRscanner && (
        <View style={styles.container}>
          <QRCode style={styles.qrstyle} value={QR} size={300} logoSize={300} />
          <View style={styles.buttonContainerR}>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={acceptHandler}>
              <MaterialIcon name={'check'} style={styles.icon} />
            </TouchableOpacity>
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

export default AddQR;
