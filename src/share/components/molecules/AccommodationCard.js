import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
/** IMPORTS FROM WITHIN THE MODULE */
import ReadMore from '../../../../app/components/atoms/readMore/ReadMore';
import Card from '../../../../app/components/atoms/card/Card';
import Colors from '../../../../app/constants/Colors';

const {height} = Dimensions.get('window');

const AccommodationCard = (props) => {
  return (
    <Card style={styles.card}>
      <ScrollView>
        {/* IMAGE */}
        <ImageBackground style={styles.image} source={{uri: props.imageUrl}}>
          <LinearGradient
            colors={['rgba(0,0,0,0.00)', '#111111']}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            locations={[0.6, 1]}
            style={[{flex: 1}]}>
            <View style={styles.header}>
              <Text style={[styles.text, styles.headerText]}>{props.name}</Text>
              <Text style={[styles.text, styles.label]}>{props.address}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        {/* DETAILS */}
        <View style={styles.detailsContainer}>
          {/* AMMENITIES */}
          <View>
            <Text style={[styles.text, styles.label]}>Ammenities</Text>
            <Text style={styles.text}>
              {props.ammenities.map((item) => item)}
            </Text>
          </View>
          {/* HOTEL RULES */}
          <View style={styles.smallMarginTop}>
            <Text style={[styles.text, styles.label]}>Hotel rules</Text>
            <Text style={styles.text}>
              Check-in: {props.hotelRules.checkIn}
            </Text>
            <Text style={styles.text}>
              Check-out: {props.hotelRules.checkOut}
            </Text>
          </View>
          {/* DESCRIPTION */}
          <View style={styles.smallMarginTop}>
            <Text style={[styles.text, styles.label]}>Description</Text>
            <ReadMore longText={props.description} />
          </View>
          {/* ATTRACTIONS */}
          <View style={styles.smallMarginTop}>
            <Text style={[styles.text, styles.label]}>Attractions</Text>
            <Text style={styles.text}>
              {props.attractions.map((item) => item.name)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: height * 0.3,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: '5%',
  },
  headerText: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
  },
  text: {
    color: Colors.text,
  },
  smallMarginTop: {
    marginTop: '5%',
  },
});

export default AccommodationCard;
