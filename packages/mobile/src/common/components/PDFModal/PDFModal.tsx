import React, { memo } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
// import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card } from 'utils';
import { styles } from './PDFModalStyle';

const PDFModal = ({
  PDF,
  handleDeletePDF,
  isPDFModalOpen,
  handleClosePDF,
  handleError,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isPDFModalOpen}
    onRequestClose={handleClosePDF}
  >
    <View style={styles.pdfContainer}>
      <Card style={styles.pdfCardContainer}>
        <View>
          {/* <Pdf source={PDF} style={styles.PDF} onError={handleError} /> */}
        </View>
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
      </Card>
    </View>
  </Modal>
);

export default memo(PDFModal);
