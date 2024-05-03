import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { memo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Caption, Card, Paragraph, Title } from 'utils';
import { cardHeight, styles } from './TransportItemStyle';

const TransportItem = ({
  destination,
  isTicketTo,
  isTicketFrom,
  dateOfDeparture,
  placeOfDeparture,
  handlePressQR,
  handlePressPDF,
  handleDeleteTransport,
}) => {
  const renderTitle = () => {
    if (isTicketTo && isTicketFrom) {
      return (
        <Title style={styles.title}>Ticket to and from {destination}</Title>
      );
    } else if (isTicketTo && !isTicketFrom) {
      return <Title style={styles.title}>Ticket to {destination}</Title>;
    } else if (!isTicketTo && isTicketFrom) {
      return <Title style={styles.title}>Ticket from {destination}</Title>;
    } else {
      return <Title style={styles.title}>{destination}</Title>;
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <Card style={styles.card}>
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
        <View style={styles.title}>{renderTitle()}</View>
        <View style={styles.info}>
          <View style={styles.dateOfDeparture}>
            <Caption>Date of departure</Caption>
            <Paragraph>{formatDate(dateOfDeparture)}</Paragraph>
          </View>
          <View style={styles.addressOfDeparture}>
            <Caption>Address of departure</Caption>
            <Paragraph>{placeOfDeparture}</Paragraph>
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default memo(TransportItem);
