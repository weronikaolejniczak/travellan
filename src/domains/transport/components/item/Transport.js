import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  Modal,
  //PermissionsAndroid,
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
import QRCode from 'react-native-qrcode-svg';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/** pdf-related imports */
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

/** Transport item component used in Transport container for tickets listing */
const Transport = (props) => {
  const dispatch = useDispatch();
  /** STATES FOR MODALS */
  const [showQR, setshowQR] = useState(false);
  const [showPDF, setshowPDF] = useState(false);

  /** IMPORTS FROM PROPS */
  const tripId = props.tripId;
  const ticketId = props.id;
  const transportTransfers = props.stages.length - 1;
  var qr = props.qr;
  var pdfUri = props.pdfUri;

  //var RNFS = require('react-native-fs');

  /** CONCATENATING FORMAT FOR PDF SOURCE */
  var source = {uri: pdfUri};
  const checkHandler = () => {
    if (qr === '' || null || undefined) {
      props.addQRHandler();
    } else {
      setshowQR(true);
    }
  };

  /** DELETION FUNCTIONS/HANDLERS */
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

  /** HIDING/CLOSING MODALS WITH QR/PDF CONTAINERS */

  const closeQRhandler = () => {
    setshowQR(false);
  };

  const closePDFhandler = () => {
    setshowPDF(false);
  };

  /** NAVIGATION TO QR ADDING SCREEN HANDLER/FUNCTION */
  /**
  const movetoQR = () => {
    navigation.navigate('Add QR', {
      tripId: tripId,
      ticketId: ticketId,
      transportTransfers: transportTransfers,
      qr: qr,
    });
  };
  */

  /** USING FILE PICKER TO ADD PDF-TICKET */
  const pickPDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      /**
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      */
      var temp = res.uri;
      pdfUri = temp;
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
          //Alert.alert('Closing QR');
          setshowQR(false);
        }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closeQRhandler}>
            <MaterialIcon name={'close'} style={styles.icon2} />
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
                <MaterialIcon name={'delete'} style={styles.icon3} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* SHOW PDF */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPDF}
        onRequestClose={() => {
          //Alert.alert('Closing PDF');
          setshowPDF(false);
        }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonTouchableLeft}
            onPress={closePDFhandler}>
            <MaterialIcon name={'close'} style={styles.icon2} />
          </TouchableOpacity>
          <Pdf
            ref={(pdf) => {
              this.pdf = pdf;
            }}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              //console.log(`number of pages: ${numberOfPages}`);
              console.log({source});
            }}
            onPageChanged={(page, numberOfPages) => {
              //console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
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
            <MaterialIcon name={'delete'} style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.actions}>
        {/* DELETE TICKET */}
        <TouchableOpacity onPress={props.deleteTransportHandler}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* SHOW/ADD QR CODE */}
        <TouchableOpacity onPress={checkHandler}>
          <MaterialIcon name={'qrcode-scan'} style={styles.icon} />
        </TouchableOpacity>

        {/* ATTACH/View TICKET-PDF */}
        <TouchableOpacity
          onPress={async () => {
            if (pdfUri === '' || null || undefined) {
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
              /* copy the file from the private app cache to the external storage which is readable*/
              /**
              let path = pdfUri;
              if (Platform.OS !== 'ios') {
                try {
                  let hasPermission = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  );
                  if (!hasPermission) {
                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                      {
                        title: 'write_storage_permission',
                        message: 'write_storage_permission_message',
                        buttonNegative: 'cancel',
                        buttonPositive: 'ok',
                      },
                    );
                    hasPermission =
                      granted !== PermissionsAndroid.RESULTS.GRANTED;
                  }
                  if (!hasPermission) {
                    handleError('error_accessing_storage');
                    return;
                  }
                } catch (error) {
                  console.warn(error);
                }
                path = `${
                  RNFS.ExternalStorageDirectoryPath,
                }/project_overview_${Number(new Date())}.pdf`;
                try {
                  await RNFS.copyFile(pdfFilePath, path);
                } catch (error) {
                  handleError(get(error, 'message', error));
                  return;
                }
              }
              function handleError(error) {
                if (error === 'not_available') {
                  error = 'mail_not_available';
                }
                Alert.alert('error', error, [{text: 'ok'}], {
                  cancelable: true,
                });
              }
              Mailer.mail(
                {
                  subject: i18n.t(
                    'FinancingPlanning.loan_request_email_subject',
                  ),
                  recipients: [],
                  body: i18n.t('FinancingPlanning.loan_request_email_body', {
                    name: get(user, 'profile.name', ''),
                  }),
                  isHTML: true,
                  attachment: {
                    path, // The absolute path of the file from which to read data.
                    type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                    name: 'project_overview.pdf', // Optional: Custom filename for attachment
                  },
                },
                (error, event) => {
                  if (error) {
                    handleError(error);
                  }
                },
              );
              */
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
