import countryCodes from '../data/countryCodes.json';
import capitalizeEachWord from './capitalizeEachWord';

const formatLocationData = (hotelData) => {
  const latitude = hotelData.latitude;
  const longitude = hotelData.longitude;

  const addressLines = capitalizeEachWord(hotelData.address.lines.join(' '));
  const postalCode = hotelData.address.postalCode;
  const cityName = capitalizeEachWord(hotelData.address.cityName);
  const countryName = countryCodes[hotelData.address.countryCode];

  const address = `${addressLines}, ${postalCode} ${cityName}, ${countryName}`;

  return { address, latitude, longitude };
};

export default formatLocationData;
