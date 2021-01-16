import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { styles } from './PDFModalStyle';
import Pdf from 'react-native-pdf';
import { Card } from 'utils';

const PDFModal = ({
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
