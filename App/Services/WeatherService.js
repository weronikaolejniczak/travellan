import axios from 'axios';

/** fetch info from api.openweathermap.org
 API KEY: 2df95b92e6ee09336448af058e8a05d8 */

// GET request
// api.openweathermap.org/data/2.5/forecast?q=DESTINATION&appid=2df95b92e6ee09336448af058e8a05d8
// could be changed to latitude and longitude
// encrypt api key

// successful request returns a response in which 'list' attribute contains
// weather information for upcoming 5 days:
// - temperature in Kelvin (have to convert to Celsius),
// - 'feels like' temperature in Kelvin,
// - humidity,
// - "weather" attribute: list of objects -> "id", "main", "description",
// - "clouds" attribute,
// - "wind" attribute: "speed" and "deg",
// - "dt_txt" attribute: "2020-05-31 03:00:00" (split into two parts).

// if "dt_txt" converted to our date format is within the trip period,
// include it in the output
// for each such date add an object with:
// "city"
// "country"
// "coord": "lat", "lon"
// "timezone"
// "sunrise" and "sunset"
// "hour": "03:00:00""
// "temp_celsius"
// "felt_temp_celsius"
// "humidity"
// "weather": "main", "description"
// "clouds"
// "wind"

// if city not found:
/**
 * {
    "cod": "404",
    "message": "city not found"
   }
 */

/** FROM OPENWEATHERMAP
 * api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}
 * &appid={your api key}

Parameters:
q city name, state code and country code divided by comma, use ISO 3166 country codes. 
You can specify the parameter not only in English. In this case, the API response
should be returned in the same language as the language of requested location name
if the location is in our predefined list of more than 200,000 locations.
 */

/** BEST TO USE LATITUDE AND LONGITUDE
  * api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={your api key}
Parameters:
lat, lon coordinates of the location of your interest
  */
