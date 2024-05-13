import url from 'url';
import Amadeus from 'amadeus';
import { Request, Response, Router } from 'express';

import fetchCoordinates from '../../services/fetchCoordinates';

const routes = Router();
const amadeus = new Amadeus({
  clientId: String(process.env.AMADEUS_API_KEY),
  clientSecret: String(process.env.AMADEUS_API_SECRET),
});

/**
 * GET /v1/location/cityCode?keyword={keyword}
 * e.g.
 * GET /v1/location/cityCode?keyword=Barcelona
 * */

const getCityCode = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { keyword } = query;

  amadeus.referenceData.locations
    .get({
      subType: 'CITY',
      keyword,
    })
    .then((response) => res.json(response.data[0].address.cityCode))
    .catch((error) => {
      throw new Error(`Error ${error.code}: ${error.message}`);
    });
};

routes.get('/cityCode', getCityCode);

/**
 * GET /v1/location/coordinates?keyword={keyword}
 * e.g.
 * GET /v1/location/coordinates?keyword=Barcelona
 * */

const getCoordinates = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { keyword } = query;

  fetchCoordinates(keyword).then((result) => {
    if (result === -1) throw new Error('Something went wrong...');
    else res.json(result);
  });
};

routes.get('/coordinates', getCoordinates);

export default routes;
