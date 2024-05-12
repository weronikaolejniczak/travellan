import request from 'request-promise';

const fetchCoordinates = (keyword: string) => {
  return request({
    method: 'GET',
    uri: encodeURI(
      `https://api.tomtom.com/search/2/geocode/${keyword}.json?key=${process.env.TOM_TOM_API_KEY}`,
    ),
    json: true,
  }).then((data) => data.results[0].position);
};

export default fetchCoordinates;
