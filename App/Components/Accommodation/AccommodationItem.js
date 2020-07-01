import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import ReadMore from '../../Components/UI/ReadMore';
import * as accommodationActions from '../../Stores/Actions/Accommodation';
import {accommodationItemStyle as styles} from './AccommodationItemStyle';
import Colors from '../../Constants/Colors';

/** Accommodation item component used in AccommodationScreen for reservations listing
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor action bar
 * refactor inline styles
 */
const AccommodationItem = (props) => {
  const dispatch = useDispatch();
  const tripId = props.tripId;
  const reservationId = props.id;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  let initialBenefits = [];
  const [benefits, setBenefits] = useState(initialBenefits);

  /** HANDLERS */
  const deleteReservationHandler = useCallback(() => {
    Alert.alert(
      'Delete accommodation',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            dispatch(
              accommodationActions.deleteReservation(tripId, reservationId),
            ),
        },
      ],
      {cancelable: true},
    );
  }, [dispatch, tripId, reservationId]);

  return (
    <Card style={styles.accommodation}>
      <View style={styles.actions}>
        <TouchableOpacity onPress={deleteReservationHandler}>
          <Ionicon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* EDIT RESERVATION INFO
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit reservation');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>

        SHOW ON MAP
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Show on map');
          }}>
          <Icon name="md-map" style={styles.icon} />
        </TouchableOpacity> */}
      </View>

      <ScrollView style={{marginTop: 10}} indicatorStyle={'white'}>
        <View>
          {/* IMAGE BACKGROUND WITH GRADIENT, NAME
          refactor uri to be the picture of the accommodation */}
          <ImageBackground
            style={styles.image}
            source={{
              uri:
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            }}>
            <LinearGradient
              colors={['rgba(0,0,0,0.00)', Colors.cards]}
              start={{x: 0.0, y: 0.0}}
              end={{x: 0.0, y: 1.0}}
              locations={[0.6, 1]}
              style={[{flex: 1}]}>
              <View style={styles.headerOverImg}>
                <Text style={[styles.text, styles.header]}>{props.name}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.container}>
            {/* ADDRESS */}
            <View>
              <Text style={[styles.text, styles.subtitle]}>
                {props.address}
              </Text>
            </View>

            {/* BENEFITS */}
            <View style={{marginTop: '7%'}}>
              <Text style={[styles.text, styles.h2]}>Benefits</Text>
              <View style={styles.benefitsContainer}>
                {/* PARKING */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Parking');
                  }}>
                  <MaterialCommunityIcon
                    style={styles.benefitIcon}
                    name={'parking'}
                  />
                </TouchableOpacity>

                {/* SWIMMING POOLS */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Swimming pools');
                  }}>
                  <MaterialCommunityIcon
                    style={styles.benefitIcon}
                    name={'swim'}
                  />
                </TouchableOpacity>

                {/* PETS */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Pets');
                  }}>
                  <MaterialIcon style={styles.benefitIcon} name={'pets'} />
                </TouchableOpacity>

                {/* SPA */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Spa');
                  }}>
                  <MaterialIcon style={styles.benefitIcon} name={'spa'} />
                </TouchableOpacity>

                {/* WIFI */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('WiFi');
                  }}>
                  <MaterialIcon style={styles.benefitIcon} name={'wifi'} />
                </TouchableOpacity>

                {/* BAR */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Bar');
                  }}>
                  <MaterialIcon style={styles.benefitIcon} name={'local-bar'} />
                </TouchableOpacity>

                {/* SPOKEN LANGUAGES */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Spoken languages');
                  }}>
                  <MaterialIcon style={styles.benefitIcon} name={'language'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* DESCRIPTION */}
            <View style={{marginTop: '7%'}}>
              <Text style={[styles.text, styles.h2]}>Description</Text>
              <View style={[styles.textAlign]}>
                <ReadMore longText={props.description} />
              </View>
            </View>

            {/* RESERVATION INFO */}
            <View style={{marginTop: '7%'}}>
              <Text style={[styles.text, styles.h2]}>Reservation info</Text>
              <Text style={[styles.text]}>
                {props.reservationDetails.length === 0
                  ? 'No details'
                  : props.reservationDetails}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default AccommodationItem;
