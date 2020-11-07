import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
/* imports from within the module */
import {fetchWeather} from 'weather/services/Weather';
import Background from 'weather/components/background/Background';
import Graphics from 'weather/components/graphics/Graphics';
import Ground from 'weather/components/ground/Ground';
import {weatherStyle as styles} from './WeatherStyle';
import Colors from 'constants/Colors';
//import {WEATHER} from 'weather/data/DummyWeather';

const windowHeight = Dimensions.get('window').height;

/* weather representational component */
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
  var endDate = new Date(selectedTrip.endDate);
  var currentDate = new Date();
  // state
  const [dateGuard, setDateGuard] = useState(false); // guard for checking day difference between currentDate and startDate
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecast, setForecast] = useState();
  //const [timezone, setTimezone] = useState();
  const [activeDay, setActiveDay] = useState();

  useEffect(() => {
    // fetch weather from OpenWeatherMap API using lat and lon values
    async function getWeather() {
      let result = await fetchWeather(latitude, longitude);
      let weather = result[0];
      //let weather = WEATHER; // dummy WEATHER
      //let tmz = result[1];
      setForecast(weather);
      //setTimezone(tmz);
      setActiveDay(weather[0]);
    }
    setIsLoading(true);
    checkDates();
    getWeather().then(() => {
      setIsLoading(false);
      setIsLoaded(true);
    });
  }, [checkDates, latitude, longitude]);

  // convert date to human readable string
  const prepareDate = (date) =>
    new Date(date).toDateString().split(' ').splice(1, 4).join(' ');

  // get day of the week
  const getDay = (date) =>
    new Date(date).toDateString().split(' ').splice(0, 1).join(' ');

  // decide whether to display weather or not
  const checkDates = useCallback(() => {
    if (startDate < currentDate && currentDate < endDate) {
      // always show weather if currentDate is bigger than startDate
      setDateGuard(true);
    } else {
      // if startDate is bigger then currentDate then calculate day difference
      const diffTime = Math.abs(startDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        // if day difference is smaller then 7, show weather
        setDateGuard(true);
      } else {
        // if day difference is bigger then 7, weather is unavailable
        setDateGuard(false);
      }
    }
    return dateGuard;
  }, [currentDate, dateGuard, endDate, startDate]);

  return (
    <View style={styles.contentContainer}>
      {isLoading && (
        <ActivityIndicator
          color={Colors.primary}
          style={styles.contentContainer}
        />
      )}
      {isLoaded && dateGuard && (
        <View style={styles.weatherContainer}>
          {forecast && (
            <View>
              <Background styles={styles} activeDay={activeDay}>
                <View style={styles.graphicsContainer}>
                  <View style={[styles.alignAndJustifyCenter, styles.graphics]}>
                    <Graphics styles={styles} activeDay={activeDay} />
                  </View>
                  <View style={[styles.justifyCenter, styles.bubbles]}>
                    {/* refactor into component */}
                    <View style={[styles.alignCenter, styles.row]}>
                      {/* small bubble */}
                      <View style={[styles.bubble, styles.smallBubble]}>
                        <Text style={[styles.text, styles.textShadow]}>
                          min
                        </Text>
                        <Text style={[styles.text, styles.textShadow]}>
                          {Math.floor(activeDay.minTemp)}°C
                        </Text>
                      </View>
                      {/* big bubble */}
                      <View
                        style={[
                          styles.bubble,
                          styles.bigBubble,
                          styles.marginLeftAndRight,
                        ]}>
                        <Text style={[styles.text, styles.textShadow]}>
                          average
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            styles.textShadow,
                            styles.bigText,
                          ]}>
                          {Math.floor(
                            (activeDay.maxTemp + activeDay.minTemp) / 2,
                          )}
                          °C
                        </Text>
                      </View>
                      {/* small bubble */}
                      <View style={[styles.bubble, styles.smallBubble]}>
                        <Text style={[styles.text, styles.textShadow]}>
                          max
                        </Text>
                        <Text style={[styles.text, styles.textShadow]}>
                          {Math.floor(activeDay.maxTemp)}°C
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[styles.ground, {bottom: -windowHeight * 0.015}]}>
                    <Ground styles={styles} activeDay={activeDay} />
                  </View>
                </View>
                <View style={styles.dataContainer}>
                  <View style={styles.halfFlex}>
                    <View style={styles.marginBottom}>
                      <Text style={styles.text}>{activeDay.description}</Text>
                    </View>
                    {/* refactor into component */}
                    {/* humidity */}
                    <View style={styles.rowAlignCenter}>
                      <View style={styles.marginRight}>
                        <Text style={styles.subdate}>HUMIDITY</Text>
                      </View>
                      <View>
                        <Text style={styles.text}>{activeDay.humidity}%</Text>
                      </View>
                    </View>
                    {/* pressure */}
                    <View style={styles.rowAlignCenter}>
                      <View style={styles.marginRight}>
                        <Text style={styles.subdate}>PRESSURE</Text>
                      </View>
                      <View>
                        <Text style={styles.text}>
                          {activeDay.pressure} hPa
                        </Text>
                      </View>
                    </View>
                    {/* wind speed */}
                    <View style={styles.rowAlignCenter}>
                      <View style={styles.marginRight}>
                        <Text style={styles.subdate}>WIND SPEED</Text>
                      </View>
                      <View>
                        <Text style={styles.text}>
                          {activeDay.windSpeed} m/s
                        </Text>
                      </View>
                    </View>
                    {/* rain */}
                    <View style={styles.rowAlignCenter}>
                      <View style={styles.marginRight}>
                        <Text style={styles.subdate}>RAIN</Text>
                      </View>
                      <View>
                        <Text style={styles.text}>
                          {(activeDay.rain * 100).toFixed(0)}%
                        </Text>
                      </View>
                    </View>
                    {/* cloudiness */}
                    <View style={styles.rowAlignCenter}>
                      <View style={styles.marginRight}>
                        <Text style={styles.subdate}>CLOUDINESS</Text>
                      </View>
                      <View>
                        <Text style={styles.text}>{activeDay.cloudiness}%</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[styles.row, styles.halfFlex, styles.marginLeft]}>
                    <View>
                      {/* during day */}
                      <View
                        style={[styles.alignCenter, styles.paddingHorizontal]}>
                        <View style={styles.marginRight}>
                          <Text style={styles.subdate}>During day</Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {Math.floor(activeDay.tempDay)}°C
                          </Text>
                        </View>
                      </View>
                      {/* feels like */}
                      <View
                        style={[
                          styles.alignAndJustifyCenter,
                          styles.marginTop,
                        ]}>
                        <View style={styles.marginRight}>
                          <Text style={styles.subdate}>Feels like</Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {Math.floor(activeDay.tempDayFeelsLike)}°C
                          </Text>
                        </View>
                      </View>
                      {/* sunrise */}
                      <View
                        style={[
                          styles.alignAndJustifyCenter,
                          styles.marginTop,
                        ]}>
                        <View style={styles.marginRight}>
                          <Text style={styles.subdate}>Sunrise</Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {activeDay.sunrise
                              .toTimeString()
                              .split(' ')[0]
                              .split(':')
                              .splice(0, 2)
                              .join(':')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.alignAndJustifyCenter}>
                        {/* during night */}
                        <View style={styles.marginRight}>
                          <Text style={styles.subdate}>During night</Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {Math.floor(activeDay.tempNight)}°C
                          </Text>
                        </View>
                      </View>
                      {/* feels like during night */}
                      <View
                        style={[
                          styles.alignAndJustifyCenter,
                          styles.marginTop,
                        ]}>
                        <View style={styles.marginRight}>
                          <Text style={styles.subdate}>Feels like</Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {Math.floor(activeDay.tempNightFeelsLike)}°C
                          </Text>
                        </View>
                      </View>
                      {/* sunset */}
                      <View
                        style={[
                          styles.alignAndJustifyCenter,
                          styles.marginTop,
                        ]}>
                        <View style={styles.marginRight}>
                          <Text style={styles.subdate}>Sunset</Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {activeDay.sunset
                              .toTimeString()
                              .split(' ')[0]
                              .split(':')
                              .splice(0, 2)
                              .join(':')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Background>
              <View style={styles.bottom}>
                <FlatList
                  horizontal
                  data={forecast}
                  keyExtractor={(item) => item.date.toString()}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  renderItem={(item) => (
                    /* refactor into component */
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setActiveDay(item.item)}>
                      <View
                        style={[
                          styles.dateContainer,
                          {
                            height: windowHeight * 0.175,
                            backgroundColor:
                              item.item === activeDay
                                ? Colors.background
                                : Colors.cards,
                            borderBottomWidth: 2,
                            borderBottomColor:
                              item.item.date.getTime() > startDate.getTime() &&
                              item.item.date.getTime() <=
                                endDate.getTime() + 60 * 60 * 24 * 1000
                                ? Colors.primary
                                : Colors.transparent,
                          },
                        ]}>
                        <Text style={styles.subdate}>
                          {prepareDate(item.item.date)}
                        </Text>
                        <Text style={styles.date}>
                          {getDay(item.item.date)}
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
      {isLoaded && !isLoading && !dateGuard && (
        <View style={styles.itemlessContainer}>
          <Text style={[styles.text, styles.itemlessText]}>
            Weather forecast is not available for your trip!
          </Text>
          {/* button to */}
          <TouchableOpacity
            onPress={() => {
              setDateGuard(true);
            }}>
            <Text style={[styles.action, styles.callToAction]}>
              Check the forecast for next 7 days
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Weather;
