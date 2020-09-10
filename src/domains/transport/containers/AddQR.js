'use strict';

import React, {useCallback, useState} from 'react';

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

import * as transportActions from 'transport/state/Actions';
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
  const dispatch = useDispatch();
  
  const tripId = props.route.params.tripId;
  const ticketId = props.route.params.ticketId;
  //const from = props.route.params.from;
  //const stages = props.route.params.stages;
  //const transportTransfers = props.route.params.transportTransfers;
  
  const [QR, setQR] = useState('');
/** 
  const updateQRhandler = async () => {
    const qr = QR;
    await dispatch(transportActions.createTransport(tripId, qr));
    props.navigation.navigate('Transport'),{
        tripId: tripId,
    };
  };
*/
  const qrHandler = async (e) => {
    setQR(e.data);
    const qr = e.data;
    await dispatch(transportActions.updateTransport(tripId, ticketId, qr));
    props.navigation.navigate('Transport'),{
        tripId: tripId,
    };
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

