import url from 'url';
import { Request, Response, Router } from 'express';

import fetchUnsplashImage from '../../services/fetchUnsplashImage';

const routes = Router();

/**
 * GET /v1/images/unsplash?keyword={keyword}
 * e.g.
 * GET /v1/images/unsplash?keyword=Barcelona
 */

const getUnsplashImage = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { keyword } = query;

  if (typeof keyword === 'string') {
    fetchUnsplashImage(keyword).then((result) => {
      if (typeof result === 'object') res.json(result);
      else throw new Error('Received type is not of type: UnsplashImage.');
    });
  } else {
    throw new Error(
      'Expected the keywoard query parameter to be of type: string',
    );
  }
};

routes.get('/unsplash', getUnsplashImage);

export default routes;
