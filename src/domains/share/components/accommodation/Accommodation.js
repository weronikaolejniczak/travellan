import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/* imports from within the module */
import Card from 'components/card/Card';
import ReadMore from 'components/readMore/ReadMore';
import {accommodationStyle as styles} from './AccommodationStyle';
import Colors from 'constants/Colors';

const Accommodation = (props) => {
  return (
    <Card style={{marginBottom: 25}}>
      <ScrollView>
        {/* IMAGE BACKGROUND WITH GRADIENT, NAME
            refactor uri to be the picture of the accommodation */}
        <ImageBackground
          style={styles.image}
          source={{
            uri: props.HOTEL.imageUrl,
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.00)', Colors.cards]}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            locations={[0.4, 1]}
            style={[{flex: 1}]}>
            <View style={styles.accommodationType}>
              <Text style={styles.text}>{props.HOTEL.type}</Text>
            </View>
            <View style={styles.bookingRating}>
              <Text style={[styles.text, styles.header]}>
                {props.HOTEL.bookingRating}
              </Text>
            </View>
            <View style={styles.headerOverImg}>
              <Text style={[styles.text, styles.header]}>
                {props.HOTEL.name}
              </Text>
              <Text style={[styles.text, styles.subheader]}>
                {props.HOTEL.address}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.parentView}>
          <View style={styles.checkInAndOut}>
            <View style={styles.checkIcon}>
              <Icon name="clock" size={24} style={styles.text} />
            </View>
            <View style={styles.checkInfo}>
              <View style={styles.checkheader}>
                <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
                  Check-in
                </Text>
                <Text style={[styles.text, {marginLeft: 10}]}>
                  {props.HOTEL.checkIn}
                </Text>
              </View>
              <View style={styles.checkheader}>
                <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
                  Check-out
                </Text>
                <Text style={[styles.text, {marginLeft: 10}]}>
                  {props.HOTEL.checkOut}
                </Text>
              </View>
            </View>
            <View style={styles.additionalInfo}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Check-in information', props.HOTEL.checkInExtra)
                }>
                <Icon
                  name="information"
                  size={24}
                  style={{color: Colors.primary}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{marginTop: 20, color: Colors.primary}}>
              {props.HOTEL.frontDesk24H
                ? '24-hour front desk'
                : 'self-service front desk'}
            </Text>
          </View>
        </View>

        <View style={styles.parentView}>
          <Text
            style={[
              styles.text,
              styles.header,
              {marginBottom: 10},
            ]}>
            Popular facilities & ammenities
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {props.HOTEL.facilities.map((ammenity) => (
              <TouchableOpacity>
                <Icon
                  name="information"
                  size={24}
                  style={{color: Colors.primary, padding: 10}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.parentView}>
          <Text
            style={[
              styles.text,
              styles.header,
              {marginBottom: 10},
            ]}>
            Description
          </Text>
          <ReadMore longText={props.HOTEL.description} />
        </View>

        <View style={styles.parentView}>
          <Text
            style={[
              styles.text,
              styles.header,
              {marginBottom: 10},
            ]}>
            Breakfast & restaurant
          </Text>
          <View style={styles.twoColumn}>
            <View style={styles.col}>
              <Text style={[styles.text, styles.smallerHeader]}>
                Breakfast options
              </Text>
              {props.HOTEL.breakfastInfo.map((option) => (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: Colors.primary, marginRight: 10}}>
                    •
                  </Text>
                  <Text style={styles.text}>{option}</Text>
                </View>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={[styles.text, styles.smallerHeader]}>
                Restaurant
              </Text>
              <Text style={{color: Colors.primary}}>
                There is a restaurant available at your accommodation.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.parentView}>
          <Text
            style={[
              styles.text,
              styles.header,
              {marginBottom: 10},
            ]}>
            Additional information
          </Text>
          <View>
            <Text
              style={[
                styles.text,
                styles.smallerHeader,
                {marginBottom: 10},
              ]}>
              Children, cribs and extra beds
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '15%', alignItems: 'center'}}>
                <Icon name="baby" size={28} style={{color: Colors.primary}} />
              </View>
              <View style={{width: '85%'}}>
                <ReadMore longText={props.HOTEL.childPolicies} />
              </View>
            </View>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={{width: '15%', alignItems: 'center'}}>
                <Icon name="hotel" size={28} style={{color: Colors.primary}} />
              </View>
              <View style={{width: '85%'}}>
                <ReadMore longText={props.HOTEL.cribAndExtraBedPolicies} />
              </View>
            </View>
          </View>
          {/* PETS */}
          <View>
            <Text style={[styles.text, styles.smallerHeader]}>
              Pets
            </Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={{width: '15%', alignItems: 'center'}}>
                <Icon name="dog" size={28} style={{color: Colors.primary}} />
              </View>
              <View style={{width: '85%'}}>
                <ReadMore longText={props.HOTEL.pets} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default Accommodation;
