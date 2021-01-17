import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import React from 'react';
import { Card } from 'utils';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { styles } from './PDFModalStyle';

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
      <View style={styles.pdfContainer}>
        <View style={styles.innerPdfContainer}>
          <View style={styles.miniHeader}>
            <TouchableOpacity
              style={styles.buttonTouchableLeft}
              onPress={handleClosePDF}
            >
              <Icon name="close" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTouchableCenter}
              onPress={handleDeletePDF}
            >
              <Icon name="delete" style={styles.icon} />
            </TouchableOpacity>
            <Pdf source={PDF} style={styles.PDF} onError={handleError} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PDFModal;
