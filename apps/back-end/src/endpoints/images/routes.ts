import url from 'url';
import { Request, Response, Router } from 'express';

import fetchUnsplashImage from '../../services/fetchUnsplashImage';

const routes = new Router();

/**
 * GET /v1/images/unsplash?keyword={keyword}
 * e.g.
 * GET /v1/images/unsplash?keyword=Barcelona
 * */

const getUnsplashImage = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { keyword } = query;

  fetchUnsplashImage(keyword).then((result) => {
    if (result === -1) throw new Error('Something went wrong...');
    else res.json(result);
  });
};

routes.get('/unsplash', getUnsplashImage);

export default routes;
