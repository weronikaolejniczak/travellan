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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import DocumentPicker from 'react-native-document-picker';
import PDF from 'react-native-pdf';

import Card from 'components/card/Card';
import * as transportActions from 'state/transport/transportActions';
import {transportItemStyle as styles, cardHeight} from './TransportStyle';
import Colors from 'constants/Colors';

const Transport = (props) => {
  const dispatch = useDispatch();
  const [showQR, setshowQR] = useState(false);
  const [showPDF, setshowPDF] = useState(false);

  const tripId = props.tripId;
  const ticketId = props.id;

  var qr = props.qr;
  var PDFUri = props.PDFUri;

  var source = {uri: PDFUri};
  const checkHandler = () => {
    if (qr === '' || null || undefined) {
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
    PDFUri = '';
    await dispatch(transportActions.updatePDF(tripId, ticketId, PDFUri));
    setshowPDF(false);
  }, [dispatch, tripId, ticketId, PDFUri]);

  const closeQRhandler = () => {
    setshowQR(false);
  };

  const closePDFhandler = () => {
    setshowPDF(false);
  };

  const pickPDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.PDF],
      });

      var temp = res.uri;
      PDFUri = temp;
      await dispatch(transportActions.updatePDF(tripId, ticketId, PDFUri));
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
                    'Delete QR code.',
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
          <PDF
            ref={(pdf) => this.pdf = pdf}
            source={source}
            style={styles.pdf}
          />
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              Alert.alert(
                'Delete a PDF ticket.',
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
          <Icon name="qrcode-scan" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            if (PDFUri === '' || null || undefined) {
              Alert.alert(
                'Add a PDF ticket?',
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
          <Icon name="file-pdf-box" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[{marginTop: cardHeight * 0.0465}]}
        indicatorStyle="white">
        <View style={[styles.rowCenter, {paddingVertical: 15}]}>
          <Text style={[styles.header]}>{props.to === true ? 'to' : 'from'} {props.destination}</Text>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 22,
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: '5%',
          }}>
          <View style={{flex: 0.5}}>
            <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
              Date of departure:
            </Text>
            <Text style={styles.text}>
              {props.dateOfDeparture.split(' ').splice(0, 5).join(' ')}
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
              Place of departure:
            </Text>
            <Text style={styles.text}>{props.placeOfDeparture}</Text>
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center', marginBottom: '5%'}}>
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

export default Transport;
