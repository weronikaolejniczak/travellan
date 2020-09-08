'use strict';

import React, {Component, useState} from 'react';

import {
  //AppRegistry,
  //StyleSheet,
  Text,
  //TouchableOpacity,
  //Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
//import code from 'react-native-aztec-qrcode';
//import {RNCamera} from 'react-native-camera';
import {AddQRStyle as styles} from './AddQRStyle';
import {useDispatch, useSelector} from 'react-redux';
/*
class ScanScreen extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };
*/
//class AddQR extends Component {
const AddQR = (props) => {
  //const dispatch = useDispatch();
  // const tripId = props.route.params.tripId;
  //const selectedTrip = useSelector((state) =>
  //   state.trips.availableTrips.find((item) => item.id === tripId),
  //);
  const [QR, setQR] = useState('');

  const qrHandler = (e) => {
    console.log(e);
    setQR(e.data);
    
  };

  return (
    <QRCodeScanner
      onRead={qrHandler}
      //flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>{QR}</Text>
          {QR ? <QRCode value={QR} /> : null}
        </Text>
      }
      /**
        bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
        }
      */
    />
  );
};

export default AddQR;

