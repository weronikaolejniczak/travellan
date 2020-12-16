import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

import Card from 'components/card/Card';
import * as transportActions from 'actions/transportActions';
import {styles, cardHeight} from './TransportItemStyle';

const TransportItem = (props) => {
  const dispatch = useDispatch();
  const [showQR, setshowQR] = useState(false);
  const [showPDF, setshowPDF] = useState(false);

  const tripId = props.tripId;
  const ticketId = props.id;

  let qr = props.qr;
  let pdfUri = props.pdfUri;

  let source = {uri: pdfUri};
  const checkHandler = () => {
    if (qr === '' || qr === null || qr === undefined) {
      props.addQRHandler();
    } else {
      setshowQR(true);
    }
  };

  const deleteQR = useCallback(async () => {
    qr = '';
    await dispatch(transportActions.updateQR(tripId, ticketId, qr));
    setshowQR(false);
  }, [dispatch, tripId, ticketId, qr]);

  const deletePDF = useCallback(async () => {
    pdfUri = '';
    await dispatch(transportActions.updatePDF(tripId, ticketId, pdfUri));
    setshowPDF(false);
  }, [dispatch, tripId, ticketId, pdfUri]);

  const closeQRhandler = () => {
    setshowQR(false);
  };

  const closePDFhandler = () => {
    setshowPDF(false);
  };

  const pickPDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      let temp = res.uri;
      pdfUri = temp;
      await dispatch(transportActions.updatePDF(tripId, ticketId, pdfUri));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  return (
    <Card style={styles.transportCard}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQR}
        onRequestClose={() => {
          setshowQR(false);
        }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closeQRhandler}>
            <Icon name="close" style={styles.icon2} />
          </TouchableOpacity>
          <View style={styles.containerQR}>
            <QRCode
              style={styles.qrstyle}
              value={qr}
              size={300}
              logoSize={300}
            />
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
                    {cancelable: true},
                  );
                }}>
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
          setshowPDF(false);
        }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closePDFhandler}>
            <Icon name="close" style={styles.icon2} />
          </TouchableOpacity>
          <Pdf
            ref={(pdf) => {
              this.pdf = pdf;
            }}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              /**INSTRUCTIONS WHEN PDF IS LOADED */
            }}
            onPageChanged={(page, numberOfPages) => {
              /**INSTRUCTIONS IF USER CHANGES PAGE */
            }}
            onError={(error) => {
              /**INSTRUCTIONS IF ERROR */
            }}
            onPressLink={(uri) => {
              /**INSTRUCTIONS IF USER PRESSES LINK */
            }}
            style={styles.pdf}
          />
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              Alert.alert(
                'Delete Ticket-pdf',
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
                {cancelable: true},
              );
            }}>
            <Icon name="delete" style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.actions}>
        <TouchableOpacity onPress={props.deleteTransportHandler}>
          <Icon name="delete" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={checkHandler}>
          <CommunityIcon name="qrcode-scan" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (pdfUri === '' || pdfUri === null || pdfUri === undefined) {
              Alert.alert(
                'Add ticket pdf?',
                'Attach document',
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
                {cancelable: true},
              );
            } else {
              setshowPDF(true);
            }
          }}>
          <CommunityIcon name="file-pdf-box" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[{marginTop: cardHeight * 0.0465}]}
        indicatorStyle="white">
        <View style={[styles.rowCenter, {paddingVertical: 15}]}>
          {props.to === true ? (
            <Text style={[styles.header]}>to {props.destination}</Text>
          ) : (
            <Text style={[styles.header]}>from {props.destination}</Text>
          )}
        </View>

        <View style={styles.infoView}>
          <View style={styles.infoInnerView}>
            <Text style={styles.infoText}>Date of departure:</Text>
            <Text style={styles.text}>
              {props.dateOfDeparture.split(' ').splice(0, 5).join(' ')}
            </Text>
          </View>
          <View style={styles.infoInnerView}>
            <Text style={styles.infoText}>Place of departure:</Text>
            <Text style={styles.text}>{props.placeOfDeparture}</Text>
          </View>
        </View>

        <View style={styles.QRView}>
          {!!qr && (
            <QRCode
              style={styles.qrstyle}
              value={qr}
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
