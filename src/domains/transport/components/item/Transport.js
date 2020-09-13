import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  Modal,
  //ProgressBarAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from 'components/card/Card';
import TransportStage from 'transport/components/stage/Transport';
import * as transportActions from 'transport/state/Actions';
import {transportItemStyle as styles, cardHeight} from './TransportStyle';

/** QR-related imports */
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/** pdf-related imports */
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

/** Transport item component used in Transport container for tickets listing */
const Transport = (props) => {
  const dispatch = useDispatch();
  
  const navigation = useNavigation(); // navigation hook
  const [showQR, setshowQR] = useState(false);
  const [showPDF, setshowPDF] = useState(false);
  const [pdfPath, setpdfPath] = useState('');
  const tripId = props.tripId;
  const ticketId = props.id;
  const transportTransfers = props.stages.length - 1;
  var qr = props.qr;
  var pdfUri = props.pdfUri;
  let source = {uri: pdfUri};

  const deleteTicketHandler = useCallback(() => {
    dispatch(transportActions.deleteTransport(tripId, ticketId));
  }, [dispatch, tripId, ticketId]);

  const closeQRhandler = () => {
    setshowQR(false);
  };
  const closePDFhandler = () => {
    setshowPDF(false);
  };

  const deleteQR = async () => {
    qr = '';
    await dispatch(transportActions.updateQR(tripId, ticketId, qr));
    setshowQR(false);
  };

  const deletePDF = async () => {
    pdfUri = '';
    await dispatch(transportActions.updatePDF(tripId, ticketId, pdfUri));
    setshowPDF(false);
  };

  const movetoQR = () => {
    navigation.navigate('Add QR', {
      tripId: tripId,
      ticketId: ticketId,
      transportTransfers: transportTransfers,
      qr: qr,
    });
  };

  const pickPDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      setpdfPath(res.uri);
      var temp = res.uri;
      pdfUri = temp;
      console.log(pdfUri);
      await dispatch(transportActions.updatePDF(tripId, ticketId, pdfUri));
      /**
      navigation.navigate('Transport', {
        tripId: tripId,
      });
      */
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <Card style={styles.transportCard}>
      {/* SHOW QR */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQR}
        onRequestClose={() => {
          Alert.alert('Closing QR');
        }}>
        <View style={styles.container}>
          <QRCode style={styles.qrstyle} value={qr} size={300} logoSize={300} />
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={closeQRhandler}>
            <MaterialIcon name={'close'} style={styles.icon} />
          </TouchableOpacity>
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
            <MaterialIcon name={'delete'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* SHOW PDF */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPDF}
        onRequestClose={() => {
          Alert.alert('Closing PDF');
        }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={closePDFhandler}>
            <MaterialIcon name={'close'} style={styles.icon} />
          </TouchableOpacity>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              //console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              //console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              //console.log(error);
            }}
            onPressLink={(uri) => {
              //console.log(`Link presse: ${uri}`);
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
            <MaterialIcon name={'delete'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.actions}>
        {/* DELETE TICKET */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete a ticket',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: deleteTicketHandler,
                },
              ],
              {cancelable: true},
            );
          }}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* SHOW/ADD QR CODE */}
        <TouchableOpacity
          onPress={() => {
            if (qr === '' || null || undefined) {
              Alert.alert(
                'Add QR code',
                'Are you sure?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: movetoQR,
                  },
                ],
                {cancelable: true},
              );
            } else {
              setshowQR(true);
            }
          }}>
          <MaterialIcon name={'qrcode-scan'} style={styles.icon} />
        </TouchableOpacity>

        {/* ATTACH/View TICKET-PDF */}
        <TouchableOpacity
          onPress={() => {
            if (pdfUri === '' || null || undefined) {
              Alert.alert(
                'Add ticket pdf?',
                'whatever',
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
          <MaterialIcon name={'file-pdf-box'} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* TO/FROM DESTINATION */}
      <ScrollView
        style={[{marginTop: cardHeight * 0.0465}]}
        indicatorStyle={'white'}>
        <View style={[styles.rowCenter, {paddingVertical: 15}]}>
          {props.to === true ? (
            <Text style={[styles.header]}>to {props.destination}</Text>
          ) : (
            <Text style={[styles.header]}>from {props.destination}</Text>
          )}
          <Text style={[styles.text]}>
            {transportTransfers === 1
              ? `${transportTransfers} transport transfer`
              : `${transportTransfers} transport transfers`}
          </Text>
        </View>

        {/* RENDER TRANSPORT STAGE COMPONENT FOR EACH STAGE */}
        <View style={{flex: 1, alignItems: 'center', marginBottom: '5%'}}>
          {props.stages.map((i) => {
            return <TransportStage stage={i} index={props.stages.indexOf(i)} />;
          })}
        </View>
      </ScrollView>
    </Card>
  );
};

export default Transport;
