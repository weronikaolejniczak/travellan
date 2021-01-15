import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import React, { useCallback, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { styles } from './TransportItemStyle';

import { Card } from 'utils';

const TransportItem = ({ QR, handleDeleteQR, isVisibleQR, handleCloseQR }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisibleQR}
      onRequestClose={handleCloseQR}
    >
      <View style={styles.qrContainer}>
        <Card style={styles.qrCardContainer}>
          <View style={styles.innerQrContainer}>
            <View style={styles.miniHeader}>
              <TouchableOpacity onPress={handleCloseQR}>
                <Icon name="close" style={styles.iconQrModal} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteQR}>
                <Icon name="delete" style={styles.iconQrModal} />
              </TouchableOpacity>
            </View>
            <View style={styles.containerQR}>
              <QRCode
                value={QR}
                size={Dimensions.get('window').width - 100}
                bgColor="black"
                fgColor="white"
              />
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default TransportItem;
