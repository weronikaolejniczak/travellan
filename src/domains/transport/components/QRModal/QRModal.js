import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import React from 'react';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { styles } from './QRModalStyle';

import { Card } from 'utils';

const QRModal = ({
  QR,
  handleDeleteQR,
  isQRModalOpen,
  handleCloseQR,
  handleError,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isQRModalOpen}
      onRequestClose={handleCloseQR}
    >
      <View style={styles.qrContainer}>
        <Card style={styles.qrCardContainer}>
          <View style={styles.innerQrContainer}>
            <View style={styles.miniHeader}>
              <TouchableOpacity onPress={handleCloseQR}>
                <Icon name="close" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteQR}>
                <Icon name="delete" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconContainerQR}>
              <QRCode
                value={QR}
                size={Dimensions.get('window').width - 100}
                bgColor="black"
                fgColor="white"
                onError={handleError}
              />
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default QRModal;
