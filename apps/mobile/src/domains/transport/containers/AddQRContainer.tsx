import * as transportActions from 'actions/transportActions';
import Colors from 'constants/Colors';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { Camera } from 'react-native-vision-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButton, Headline, Paragraph } from 'utils';
import { styles } from './AddQRContainerStyle';

const QRCodeScanner = () => {
  return null;
};

const AddQRContainer = (props) => {
  const dispatch = useDispatch();

  const tripId = props.route.params.tripId;
  const ticketId = props.route.params.ticketId;

  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );

  let qr = props.qr;

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
    qr = { QR };
    qr = qr.QR;
    await dispatch(transportActions.addQRRequest(tripId, ticketId, qr));
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
          //style={styles.centered}
          onRead={qrHandler}
          showMarker={true}
          /* flashMode={
            torchOn
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          } */
          topContent={
            <View style={styles.lightView}>
              {torchOn ? (
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={switchLight}
                >
                  <MaterialIcon name={'flashlight-off'} style={styles.icon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={switchLight}
                >
                  <MaterialIcon name={'flashlight'} style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          }
          bottomContent={
            <View style={{ marginTop: 20 }}>
              <Text style={styles.buttonText}>Track Ticket's QR-code</Text>
            </View>
          }
        />
      )}
      {!showQRscanner && (
        <View style={styles.container}>
          <View styles={{ padding: 10 }}>
            <QRCode value={QR} size={Dimensions.get('window').width - 100} />
          </View>
          <Headline style={styles.textHead}>Notice:</Headline>
          <Paragraph style={styles.text}>
            QR above may not look identically the same as the QR you have just
            scanned but it contains the same information.
          </Paragraph>
          <View style={styles.innerQrContainer}>
            <View style={styles.miniHeader}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={acceptHandler}
                >
                  <MaterialIcon name={'check'} style={styles.icon} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={redoHandler}
              >
                <MaterialIcon name={'close'} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export const qrOptions = (_props) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Set Torch"
          iconName="flashlight"
          onPress={() => {
            //
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default AddQRContainer;
