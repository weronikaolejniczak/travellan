import React from 'react';
import {View, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Card from 'components/card/Card';
import ReadMore from 'components/readMore/ReadMore';
import {AccommodationItemHeader} from 'domains/accommodation/components';
import {styles} from './AccommodationItemStyle';
import {Colors} from 'constants';

const AccommodationItem = (props) => {
  const {data} = props;

  return (
    <Card style={styles.accommodation}>
      <ScrollView>
        <AccommodationItemHeader
          image={data.image}
          type={data.type}
          rating={data.rating}
          name={data.name}
          address={data.address}
        />

        <View style={styles.parentView}>
          <View style={styles.checkInAndOut}>
            <View style={styles.checkIcon}>
              <Icon name="access-time" size={24} style={styles.text} />
            </View>
            <View style={styles.checkInfo}>
              <View style={styles.checkHeader}>
                <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
                  Check-in
                </Text>
                <Text style={[styles.text, {marginLeft: 10}]}>
                  {data.checkIn}
                </Text>
              </View>
              <View style={styles.checkHeader}>
                <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
                  Check-out
                </Text>
                <Text style={[styles.text, {marginLeft: 10}]}>
                  {data.checkOut}
                </Text>
              </View>
              <View>
                <Text style={{color: Colors.primary}}>
                  {data.frontDesk24H
                    ? '24-hour front desk'
                    : 'self-service front desk'}
                </Text>
              </View>
            </View>

            <View style={styles.additionalInfo}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Check-in information', data.checkInExtra)
                }>
                <Icon name="info" size={24} style={{color: Colors.primary}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.parentView}>
          <Text style={[styles.text, styles.header, {marginBottom: 10}]}>
            Popular facilities & amenities
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {data.amenities.map((amenity) => (
              <TouchableOpacity>
                <Icon
                  name="pets"
                  size={24}
                  style={{color: Colors.primary, padding: 10}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.parentView}>
          <Text style={[styles.text, styles.header, {marginBottom: 10}]}>
            Description
          </Text>
          <ReadMore longText={data.description} />
        </View>

        <View style={styles.parentView}>
          <Text style={[styles.text, styles.header, {marginBottom: 10}]}>
            Breakfast & restaurant
          </Text>
          <View style={styles.twoColumn}>
            <View style={styles.col}>
              <Text style={[styles.text, styles.smallerHeader]}>
                Breakfast options
              </Text>
              {data.breakfast.map((option) => (
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
          <Text style={[styles.text, styles.header, {marginBottom: 10}]}>
            Additional information
          </Text>
          <View>
            <Text
              style={[styles.text, styles.smallerHeader, {marginBottom: 10}]}>
              Children, cribs and extra beds
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '15%', alignItems: 'center'}}>
                <Icon
                  name="child-friendly"
                  size={28}
                  style={{color: Colors.primary}}
                />
              </View>
              <View style={{width: '85%'}}>
                <ReadMore longText={data.childPolicies} />
              </View>
            </View>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={{width: '15%', alignItems: 'center'}}>
                <Icon name="hotel" size={28} style={{color: Colors.primary}} />
              </View>
              <View style={{width: '85%'}}>
                <ReadMore longText={data.extraBedPolicies} />
              </View>
            </View>
          </View>

          <View>
            <Text style={[styles.text, styles.smallerHeader]}>Pets</Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={{width: '15%', alignItems: 'center'}}>
                <Icon name="pets" size={28} style={{color: Colors.primary}} />
              </View>
              <View style={{width: '85%'}}>
                <ReadMore longText={data.pets} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default AccommodationItem;
