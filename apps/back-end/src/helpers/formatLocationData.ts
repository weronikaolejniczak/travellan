import countryCodes from '../data/country-codes.json';
import capitalizeEachWord from './capitalizeEachWord';

interface IHotelData {
  address: {
    cityName: string;
    countryCode: string;
    lines: string[];
    postalCode: string;
  };
  latitude: string;
  longitude: string;
}

const formatLocationData = (data: IHotelData) => {
  const latitude = data.latitude;
  const longitude = data.longitude;

  const addressLines = capitalizeEachWord(data.address.lines.join(' '));
  const postalCode = data.address.postalCode;
  const cityName = capitalizeEachWord(data.address.cityName);
  const countryName =
    countryCodes[data.address.countryCode as keyof typeof countryCodes];

  const address = `${addressLines}, ${postalCode} ${cityName}, ${countryName}`;

  return { address, latitude, longitude };
};

export default formatLocationData;
