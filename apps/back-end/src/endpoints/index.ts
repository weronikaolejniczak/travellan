import accommodationRoutes from './accommodation/routes';
import imagesRoutes from './images/routes';
import locationRoutes from './location/routes';
import weatherRoutes from './weather/routes';

export default (app) => {
  const version = process.env.API_VERSION;

  app.use(`/v${version}/accommodation`, accommodationRoutes);
  app.use(`/v${version}/weather`, weatherRoutes);
  app.use(`/v${version}/images`, imagesRoutes);
  app.use(`/v${version}/location`, locationRoutes);
};
