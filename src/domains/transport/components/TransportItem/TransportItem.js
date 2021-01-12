import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import QRCode from 'react-native-qrcode-svg';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { Card, View as Container } from 'utils';
import { cardHeight, styles } from './TransportItemStyle';
import { patchPDFRequest, patchQRRequest } from 'actions/transportActions';

const TransportItem = ({
  tripId,
  destination,
  isTicketTo,
  dateOfDeparture,
  placeOfDeparture,
  id,
  QR,
  PDF,
  handleAddQR,
  handleDeleteTransport,
}) => {
  const dispatch = useDispatch();
  const source = { uri: PDF };

  const [QRCodeString, setQRCodeString] = useState(QR);
  const [PDFUri, setPDFUri] = useState(PDF);
  const [showQR, setShowQR] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const checkHandler = () => {
    if (QR === '' || QR === null || QR === undefined) {
      handleAddQR();
    } else {
      setShowQR(true);
    }
  };

  const deleteQR = useCallback(async () => {
    setQRCodeString('');
    await dispatch(patchQRRequest(tripId, id, ''));
    setShowQR(false);
  }, [dispatch, tripId, id]);

  const deletePDF = useCallback(async () => {
    setPDFUri('');
    await dispatch(patchPDFRequest(tripId, id, ''));
    setShowPDF(false);
  }, [dispatch, tripId, id]);

  const closeQRhandler = () => setShowQR(false);

  const closePDFhandler = () => setShowPDF(false);

  const pickPDF = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const temp = res.uri;
      await dispatch(patchPDFRequest(tripId, id, temp));
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) throw err;
    }
  }, [dispatch, tripId, id]);

  return (
    <Card style={styles.transportCard}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showQR}
        onRequestClose={() => setShowQR(false)}
      >
        <View style={styles.qrContainer}>
          <Card style={styles.qrCardContainer}>
            <View style={styles.innerQrContainer}>
              <View style={styles.miniHeader}>
                <TouchableOpacity onPress={closeQRhandler}>
                  <Icon name="close" style={styles.icon2} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete QR',
                      'Are you sure?',
                      [
                        {
                          style: 'cancel',
                          text: 'Cancel',
                        },
                        {
                          onPress: deleteQR,
                          text: 'OK',
                        },
                      ],
                      { cancelable: true },
                    );
                  }}
                >
                  <Icon name="delete" style={styles.icon3} />
                </TouchableOpacity>
              </View>
              <View style={styles.containerQR}>
                <QRCode
                  value={QR}
                  size={Dimensions.get('window').width - 100}
                  fgColor="white"
                />
              </View>
            </View>
          </Card>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPDF}
        onRequestClose={() => setShowPDF(false)}
      >
        <Container>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closePDFhandler}
          >
            <Icon name="close" style={styles.icon2} />
          </TouchableOpacity>
          <Pdf
            /* ref={(pdf) => {
              this.pdf = pdf;
            }} */
            source={source}
            style={styles.PDF}
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
            <Icon name="delete" style={styles.icon2} />
          </TouchableOpacity>
        </Container>
      </Modal>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDeleteTransport}>
          <Icon name="delete" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={checkHandler}>
          <CommunityIcon name="qrcode-scan" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (PDFUri === '' || PDFUri === null || PDFUri === undefined) {
              Alert.alert(
                'Add a ticket PDF?',
                'Attach document to the ticket.',
                [
                  {
                    style: 'cancel',
                    text: 'Cancel',
                  },
                  {
                    onPress: pickPDF,
                    text: 'OK',
                  },
                ],
                { cancelable: true },
              );
            } else {
              setShowPDF(true);
            }
          }}
        >
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
