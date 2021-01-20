import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import React from 'react';
import { Card } from 'utils';
import { Modal, TouchableOpacity, View } from 'react-native';
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
      transparent={true}
      visible={isPDFModalOpen}
      onRequestClose={handleClosePDF}
    >
      <View style={styles.pdfContainer}>
        <Card style={styles.pdfCardContainer}>
          <View style={styles.innerPdfContainer}>
            <View style={styles.miniHeader}>
              <TouchableOpacity onPress={handleClosePDF}>
                <Icon name="close" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletePDF}>
                <Icon name="delete" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Pdf source={PDF} style={styles.PDF} onError={handleError} />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default PDFModal;