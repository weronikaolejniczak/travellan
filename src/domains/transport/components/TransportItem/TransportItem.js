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

import * as transportActions from 'actions/transportActions';
import Card from 'components/card/Card';
import { cardHeight, styles } from './TransportItemStyle';

const TransportItem = (props) => {
  const dispatch = useDispatch();
  const {
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
  } = props;
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
    await dispatch(transportActions.updateQR(tripId, id, QRCodeString));
    setShowQR(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId, id, QRCodeString]);

  const deletePDF = useCallback(async () => {
    setPDFUri('');
    await dispatch(transportActions.updatePDF(tripId, id, PDFUri));
    setShowPDF(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId, id, PDFUri]);

  const closeQRhandler = () => setShowQR(false);

  const closePDFhandler = () => setShowPDF(false);

  const pickPDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const temp = res.uri;
      setPDFUri(temp);

      await dispatch(transportActions.updatePDF(tripId, id, PDFUri));
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) throw err;
    }
  };

  return (
    <Card style={styles.transportCard}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQR}
        onRequestClose={() => {
          setShowQR(false);
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closeQRhandler}
          >
            <Icon name="close" style={styles.icon2} />
          </TouchableOpacity>
          <View style={styles.containerQR}>
            <QRCode style={styles.QR} value={QR} size={300} logoSize={300} />
            <View style={styles.containerRow}>
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={() => {
                  Alert.alert(
                    'Delete QR',
                    'Are you sure?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: deleteQR,
                      },
                    ],
                    { cancelable: true },
                  );
                }}
              >
                <Icon name="delete" style={styles.icon3} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPDF}
        onRequestClose={() => {
          setShowPDF(false);
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closePDFhandler}
          >
            <Icon name="close" style={styles.icon2} />
          </TouchableOpacity>
          <Pdf
            ref={(pdf) => {
              this.pdf = pdf;
            }}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              /**iNSTRUCTIONS WHEN PDF IS LOADED */
            }}
            onPageChanged={(page, numberOfPages) => {
              /**iNSTRUCTIONS IF USER CHANGES PAGE */
            }}
            onError={(error) => {
              /**iNSTRUCTIONS IF ERROR */
            }}
            onPressLink={(uri) => {
              /**iNSTRUCTIONS IF USER PRESSES LINK */
            }}
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
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: deletePDF,
                  },
                ],
                { cancelable: true },
              );
            }}
          >
            <Icon name="delete" style={styles.icon2} />
          </TouchableOpacity>
        </View>
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
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: pickPDF,
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
