import React from 'react';
import {View, ScrollView, Text, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
/* imports from within the module */
import NavigationButton from 'myTrips/components/navigationButton/NavigationButton';
import {tripDetailsStyle as styles} from './TripDetailsStyle';

/* trip details presentational component - displays details about each trip */
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
        {/* Image background and overlay with photo author credits and date range of the trip */}
        <ImageBackground style={styles.image} source={{uri: imageUrl}}>
          <LinearGradient
            colors={['rgba(0,0,0,0.00)', '#222222']}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            locations={[0.6, 1]}
            style={[{flex: 1}]}>
            <View style={styles.dateContainer}>
              {/* UNSPLASH ARTIST CREDITS */}
              <View style={{justifyContent: 'space-around'}}>
                <Text style={[styles.text, {textAlign: 'center'}]}>
                  Photo by {author} @Unsplash/{username}
                </Text>
              </View>
              {/* START DATE AND END DATE OF THE TRIP */}
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

      {/* Trip details and tools */}
      <View>
        {/* Information about the time left to departure
          if there's no ticket added - counts the days
          if there's a ticket added - counts the days and hours
        */}
        {/* Functionalities */}
        <View style={styles.tiles}>
          {/* Transport */}
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Transport'}
            id={selectedTrip.id}
            androidIcon={'md-paper-plane'}
            iOSIcon={'ios-paper-plane'}
          />
          {/* Accommodation */}
           <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Accommodation'}
            id={selectedTrip.id}
            androidIcon={'md-bed'}
            iOSIcon={'ios-bed'}
          />
          {/* Map */}
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Map'}
            id={selectedTrip.id}
            androidIcon={'md-map'}
            iOSIcon={'ios-map'}
          />
          {/* Weather */}
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Weather'}
            id={selectedTrip.id}
            androidIcon={'md-cloudy'}
            iOSIcon={'ios-cloudy'}
          />
          {/* Budget */}
          <NavigationButton
            styles={styles}
            navigation={props.navigation}
            screenToNavigateTo={'Budget'}
            id={selectedTrip.id}
            androidIcon={'md-wallet'}
            iOSIcon={'ios-wallet'}
          />
          {/* Notes */}
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
