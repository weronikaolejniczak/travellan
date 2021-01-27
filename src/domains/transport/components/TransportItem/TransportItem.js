import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import React, { useState } from 'react';
import { Card } from 'utils';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { cardHeight, styles } from './TransportItemStyle';

const TransportItem = ({
  destination,
  isTicketTo,
  dateOfDeparture,
  placeOfDeparture,
  handlePressQR,
  handlePressPDF,
  handleDeleteTransport,
}) => {

  return (
    <Card style={styles.transportCard}>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDeleteTransport}>
          <Icon name="delete" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressQR}>
          <CommunityIcon name="qrcode-scan" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressPDF}>
          <CommunityIcon name="file-pdf-box" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[{ marginTop: cardHeight * 0.0465 }]}
        indicatorStyle="white"
      >
        <View style={styles.rowCenter}>
          {isTicketTo === true ? (
            <Text style={styles.header}>to {destination}</Text>
          ) : (
            <Text style={styles.header}>from {destination}</Text>
          )}
        </View>

        <View style={styles.infoView}>
          <View style={styles.infoInnerView}>
            <Text style={styles.infoText}>Date of departure:</Text>
            <Text style={styles.text}>
              {dateOfDeparture.split(' ').splice(0, 5).join(' ')}
            </Text>
          </View>
          <View style={styles.infoInnerView}>
            <Text style={styles.infoText}>Place of departure:</Text>
            <Text style={styles.text}>{placeOfDeparture}</Text>
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default TransportItem;
