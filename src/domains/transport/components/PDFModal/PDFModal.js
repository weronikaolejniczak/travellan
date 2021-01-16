import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import React from 'react';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { styles } from './QRModalStyle';

import { Card } from 'utils';

const QRModal = ({
  PDF,
  handleDeletePDF,
  isPDFModalOpen,
  handleClosePDF,
  handleError,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isPDFModalOpen}
      onRequestClose={handleClosePDF}
    >
      <TouchableOpacity
        style={styles.buttonTouchableLeft}
        onPress={handleClosePDF}
      >
        <Icon name="close" style={styles.icon} />
      </TouchableOpacity>
      <Pdf
        source={uri : PDF}
        style={styles.PDF}
        onError={(error) => {
          console.log(error);
        }}
      />
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={handleDeletePDF}
      >
        <Icon name="delete" style={styles.icon} />
      </TouchableOpacity>
    </Modal>
  );
};

export default QRModal;
