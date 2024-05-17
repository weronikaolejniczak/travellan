import url from 'url';
import { Request, Response, Router } from 'express';

import fetchWeather from '../../services/fetchWeather';

const routes = Router();

/**
 * GET /v1/weather?latitude={latitude}&longitude={longitude}
 * e.g.
 * GET /v1/weather?latitude=52.4064&longitude=16.9252
 * */

const getWeather = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { latitude, longitude } = query;

  if (typeof latitude === 'string' && typeof longitude === 'string') {
    fetchWeather(latitude, longitude).then((result) => {
      if (typeof result === 'object') res.json(result);
      else throw new Error('Received data is not of type: `WeatherResponse`.');
    });
  } else {
    throw new Error(
      'Expected the `latitude` and `longitude` query parameters to be of type: `string`.',
    );
  }
};

routes.get('/', getWeather);

export default routes;
