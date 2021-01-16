import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import QRCode from 'react-native-qrcode-svg';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { Card, View as Container } from 'utils';
import { addPDFRequest, deletePDFRequest } from 'actions/transportActions';
import { cardHeight, styles } from './TransportItemStyle';

const TransportItem = ({
  tripId,
  destination,
  isTicketTo,
  dateOfDeparture,
  placeOfDeparture,
  id,
  QR,
  PDF,
  handlePressQR,
  handlePressPDF,
  handleDeleteTransport,
}) => {
  const dispatch = useDispatch();
  const source = { uri: PDF };

  const [QRCodeString, setQRCodeString] = useState(QR);
  const [PDFUri, setPDFUri] = useState(PDF);
  const [showPDF, setShowPDF] = useState(false);

  const deletePDF = useCallback(async () => {
    setPDFUri('');
    await dispatch(deletePDFRequest(tripId, id, ''));
    setShowPDF(false);
  }, [dispatch, tripId, id]);

  const closePDFhandler = () => setShowPDF(false);

  return (
    <Card style={styles.transportCard}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showPDF}
        onRequestClose={() => setShowPDF(false)}
      >
        <TouchableOpacity
          style={styles.buttonTouchableLeft}
          onPress={closePDFhandler}
        >
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
        <Pdf
          source={source}
          style={styles.PDF}
          onError={(error) => {
            console.log(error);
          }}
        />
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => {
            Alert.alert(
              'Delete PDF ticket.',
              'Are you sure?',
              [
                {
                  style: 'cancel',
                  text: 'Cancel',
                },
                {
                  onPress: deletePDF,
                  text: 'OK',
                },
              ],
              { cancelable: true },
            );
          }}
        >
          <Icon name="delete" style={styles.icon} />
        </TouchableOpacity>
      </Modal>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDeleteTransport}>
          <Icon name="delete" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressQR}>
          <CommunityIcon name="qrcode-scan" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressPDF}>
          <CommunityIcon name="file-pdf-box" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[{ marginTop: cardHeight * 0.0465 }]}
        indicatorStyle="white"
      >
        <View style={styles.rowCenter}>
          {isTicketTo === true ? (
            <Text style={styles.header}>to {destination}</Text>
          ) : (
            <Text style={styles.header}>from {destination}</Text>
          )}
        </View>

        <View style={styles.infoView}>
          <View style={styles.infoInnerView}>
            <Text style={styles.infoText}>Date of departure:</Text>
            <Text style={styles.text}>
              {dateOfDeparture.split(' ').splice(0, 5).join(' ')}
            </Text>
          </View>
          <View style={styles.infoInnerView}>
            <Text style={styles.infoText}>Place of departure:</Text>
            <Text style={styles.text}>{placeOfDeparture}</Text>
          </View>
        </View>

        <View style={styles.QRView}>
          {!!QRCodeString && (
            <QRCode
              style={styles.QR}
              value={QRCodeString}
              size={250}
              logoSize={250}
            />
          )}
        </View>
      </ScrollView>
    </Card>
  );
};

export default TransportItem;
