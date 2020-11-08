import React from 'react';
import {View, ScrollView, Text, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import NavigationButton from 'trips/components/navigationButton/NavigationButton';
import {tripDetailsStyle as styles} from './TripDetailsStyle';

const TripDetails = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const author = selectedTrip.image.authorName;
  const username = selectedTrip.image.username;
  const imageUrl = selectedTrip.image.imageUrl;
  const startDate = selectedTrip.startDate.split(' ').slice(1, 4).join(' ');
  const endDate = selectedTrip.endDate.split(' ').slice(1, 4).join(' ');

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground style={styles.image} source={{uri: imageUrl}}>
          <LinearGradient
            colors={['rgba(0,0,0,0.00)', '#222222']}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            locations={[0.6, 1]}
            style={[{flex: 1}]}>
            <View style={styles.dateContainer}>
              <View style={{justifyContent: 'space-around'}}>
                <Text style={[styles.text, {textAlign: 'center'}]}>
                  Photo by {author} @Unsplash/{username}
                </Text>
              </View>
              <Text style={[styles.text, styles.header, styles.date]}>
                {startDate === endDate ? (
                  <Text style={[styles.text, styles.date]}>{startDate}</Text>
                ) : (
                  <Text style={[styles.text, styles.date]}>
                    {startDate} - {endDate}
                  </Text>
                )}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View>
        <View style={styles.tiles}>
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Transport'}
            id={selectedTrip.id}
            androidIcon={'md-paper-plane'}
            iOSIcon={'ios-paper-plane'}
          />
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Accommodation'}
            id={selectedTrip.id}
            androidIcon={'md-bed'}
            iOSIcon={'ios-bed'}
          />
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Map'}
            id={selectedTrip.id}
            androidIcon={'md-map'}
            iOSIcon={'ios-map'}
          />
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Weather'}
            id={selectedTrip.id}
            androidIcon={'md-cloudy'}
            iOSIcon={'ios-cloudy'}
          />
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Budget'}
            id={selectedTrip.id}
            androidIcon={'md-wallet'}
            iOSIcon={'ios-wallet'}
          />
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Notes'}
            id={selectedTrip.id}
            androidIcon={'md-journal'}
            iOSIcon={'ios-journal'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

/** we export screenOptions to use in our Stack.Navigator
 * @param {*} navigation: lets us use "navigation" prop from within this function */
export const tripDetailsOptions = (navigation) => {
  return {
    headerTitle: navigation.route.params.tripDestination,
  };
};

export default TripDetails;
