import url from 'url';
import { Request, Response, Router } from 'express';

import fetchWeather from '../../services/fetchWeather';

const routes = new Router();
/**
 * GET /v1/weather?latitude={latitude}&longitude={longitude}
 * e.g.
 * GET /v1/weather?latitude=52.4064&longitude=16.9252
 * */

const getWeather = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { latitude, longitude } = query;

  fetchWeather(latitude, longitude).then((result) => {
    if (result === -1) throw new Error('Something went wrong...');
    else res.json(result);
  });
};

routes.get('/', getWeather);

export default routes;
