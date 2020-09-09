import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
/** imports from within the module */
import {fetchWeather} from 'weather/services/Weather';
import {weatherStyle as styles} from './WeatherStyle';
import {WEATHER} from 'weather/data/DummyWeather';
import Sun from 'assets/images/sun.svg';
import Grass from 'assets/images/grass.svg';
import Colors from 'constants/Colors';

/** weather representational component */
const Weather = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const region = selectedTrip.region;
  const latitude = region.latitude;
  const longitude = region.longitude;

  // date operations
  var startDate = new Date(selectedTrip.startDate);
  var convertedStartDate = new Date(
    `${startDate.getFullYear()}'-'${
      startDate.getMonth() + 1
    }'-'${startDate.getDate()}`,
  );
  var currentDate = new Date();

  const [differenceGuard, setDifferenceGuard] = useState(false); // guard for checking day difference between currentDate and startDate
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecast, setForecast] = useState(WEATHER);
  const [timezone, setTimezone] = useState();
  const [activeDay, setActiveDay] = useState();

  useEffect(() => {
    // fetch weather from OpenWeatherMap API using lat and lon values
    async function getWeather() {
      //let result = await fetchWeather(latitude, longitude);
      //let weather = result[0];
      //let tmz = result[1];
      //console.log(weather);
      //setForecast(WEATHER); // small caps 'weather'
      //setTimezone(tmz);
      setActiveDay(WEATHER[0]);
    }
    setIsLoading(true);
    checkDates();
    getWeather().then(() => {
      setIsLoading(false);
      setIsLoaded(true);
    });
  }, []);

  // decide whether to display weather or not
  const checkDates = () => {
    if (startDate < currentDate) {
      // always show weather if currentDate is bigger then startDate
      setDifferenceGuard(true);
    } else {
      // if startDate is bigger then currentDate then calculate day difference
      const diffTime = Math.abs(startDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        // if day difference is smaller then 7, show weather
        setDifferenceGuard(true);
      } else {
        // if day difference is bigger then 7, weather is unavailable
        setDifferenceGuard(false);
      }
    }
    //console.log('DIFFERENCE GUARD VALUE: ' + differenceGuard);
    return differenceGuard;
  };

  return (
    <View style={styles.contentContainer}>
      {isLoading && (
        <ActivityIndicator
          color={Colors.primary}
          style={styles.contentContainer}
        />
      )}
      {isLoaded && differenceGuard && (
        <View style={styles.weatherContainer}>
          {forecast && (
            <View>
              <LinearGradient
                colors={['#80E0FF', '#2BABE1']}
                style={styles.linearGradient}>
                <View style={styles.graphicsContainer}>
                  <View
                    style={{
                      flex: 0.65,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Sun width={200} />
                  </View>
                  <View
                    style={{
                      flex: 0.35,
                      justifyContent: 'center',
                      marginBottom: 15,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 85,
                          height: 85,
                          borderRadius: 50,
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.text}>min</Text>
                        <Text style={styles.text}>
                          {Math.floor(activeDay.minTemp)}°C
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 60,
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                          marginRight: 10,
                        }}>
                        <Text style={[styles.text, {fontSize: 38}]}>
                          {Math.floor(
                            (activeDay.maxTemp + activeDay.minTemp) / 2,
                          )}
                          °C
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 85,
                          height: 85,
                          borderRadius: 50,
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.text}>max</Text>
                        <Text style={styles.text}>
                          {Math.floor(activeDay.maxTemp)}°C
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -6,
                    }}>
                    <Grass />
                  </View>
                </View>
                <View style={styles.dataContainer}>
                  <View style={{flex: 0.5}}>
                    <Text style={styles.text}>{activeDay.description}</Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Text style={styles.text}>Second part</Text>
                  </View>
                </View>
              </LinearGradient>
              <View style={styles.bottom}>
                <FlatList
                  horizontal
                  data={WEATHER}
                  keyExtractor={(item) => item.date.toString()}
                  ItemSeparatorComponent={() => (
                    <View style={{width: 1, backgroundColor: '#222222'}} />
                  )}
                  renderItem={(item) => (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setActiveDay(item.item)}>
                      <View
                        style={[
                          styles.dateContainer,
                          {
                            backgroundColor:
                              item.item === activeDay ? '#222' : '#111',
                          },
                        ]}>
                        <Text style={styles.subdate}>
                          {item.item.date
                            .toLocaleString()
                            .split(' ')
                            .slice(0, 2)
                            .join(' ')
                            .replace(',', '')}
                        </Text>
                        <Text style={styles.date}>
                          {item.item.date
                            .toDateString()
                            .split(' ')
                            .slice(0, 1)
                            .join(' ')
                            .replace(',', '')}
                        </Text>
                        <Image
                          style={{width: 45, height: 45}}
                          source={{
                            uri:
                              'http://openweathermap.org/img/wn/' +
                              item.item.icon +
                              '.png',
                          }}
                        />
                        <Text style={styles.text}>
                          {Math.floor(
                            (item.item.maxTemp + item.item.minTemp) / 2,
                          )}
                          °C
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          )}
        </View>
      )}
      {isLoaded && !isLoading && !differenceGuard && (
        <View style={styles.itemlessContainer}>
          <Text style={[styles.text, styles.itemlessText]}>
            Weather forecast is not available for your trip!
          </Text>
          {/* button to */}
          <TouchableOpacity
            onPress={() => {
              setDifferenceGuard(true);
            }}>
            <Text style={[styles.action, styles.actionContainer]}>
              Check the forecast for next 7 days
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Weather;
