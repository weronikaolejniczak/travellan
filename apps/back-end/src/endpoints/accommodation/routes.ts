import url from 'url';
import Amadeus from 'amadeus';
import { Request, Response, Router } from 'express';

import capitalizeEachWord from '../../helpers/capitalizeEachWord';
import formatLocationData from '../../helpers/formatLocationData';
import getHotelOffer from '../../helpers/getHotelOffer';
import createHotel from '../../models/Hotel';
import scrapeBooking from '../../services/scrapeBooking';

const routes = Router();
const amadeus = new Amadeus({
  clientId: String(process.env.AMADEUS_API_KEY),
  clientSecret: String(process.env.AMADEUS_API_SECRET),
});

/**
 * GET /v1/accommodation/hotelByName?latitude={latitude}&longitude={longitude}&radius={radius}&hotelName={hotelName}
 * e.g.
 * GET /v1/accommodation/hotelByName?latitude=53.4285&longitude=14.5528&radius=5&hotelName=CAMPANILE
 * */

const getHotelByName = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const { latitude, longitude, hotelName, radius } = query;

  amadeus.shopping.hotelOffers
    .get({
      latitude,
      longitude,
      hotelName,
      radius,
      radiusUnit: 'KM',
      includeClosed: true,
    })
    .then((response: Response) => {
      if (response.data.length === 0) res.json([]);

      const data = response.data[0];
      const amenities = data.hotel.amenities.map((item: string) =>
        item.toLowerCase().split('_').join(' '),
      );
      const image =
        'https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

      // TODO: check possiblity of credit card payment
      const hotel = createHotel({
        amenities,
        creditCardPaymentPossible: true,
        description: data.hotel.description.text,
        image,
        location: formatLocationData(data.hotel),
        name: capitalizeEachWord(data.hotel.name),
        phone: data.hotel.contact.phone,
      });

      res.json(hotel);
    })
    .catch((error) => {
      res.status(error.response.statusCode || 500);
      res.json(JSON.parse(error.response.body));
    });
};

routes.get('/hotelByName', getHotelByName);

/**
 * GET /v1/accommodation/recommendation?latitude={latitude}&longitude={longitude}&radius={radius}&checkInDate={checkInDate}&checkOutDate={checkOutDate}&roomQuantity={roomQuantity}&adults={adults}
 * e.g.
 * GET /v1/accommodation/recommendation?latitude=53.4285&longitude=14.5528&radius=30&checkInDate=2021-03-15&checkOutDate=2021-03-18&roomQuantity=1&adults=1
 * */

const getHotelRecommendation = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const {
    latitude,
    longitude,
    radius,
    checkInDate,
    checkOutDate,
    roomQuantity,
    adults,
  } = query;

  amadeus.shopping.hotelOffers
    .get({
      latitude,
      longitude,
      radius,
      radiusUnit: 'KM',
      checkInDate,
      checkOutDate,
      roomQuantity,
      adults,
      page: 7,
    })
    .then((response: Response) => {
      const list = [];
      const data = response.data;

      for (let i = 0; i < data.length; i++) {
        const item = response.data[i];
        const amenities = item.hotel.amenities.map((item: string) =>
          item.toLowerCase().split('_').join(' '),
        );
        const image =
          'https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

        // TODO: check possiblity of credit card payment
        const hotel = createHotel({
          amenities,
          description: item.hotel.description.text,
          dupeId: item.hotel.dupeId,
          image,
          location: formatLocationData(item.hotel),
          name: capitalizeEachWord(item.hotel.name),
          offer: getHotelOffer(item.offers),
          phone: item.hotel.contact.phone,
          rating: item.hotel.rating,
        });

        list.push(hotel);
      }

      res.json(list);
    })
    .catch((error) => {
      res.status(error.response.statusCode || 500);
      res.json(JSON.parse(error.response.body));
    });
};

routes.get('/recommendation', getHotelRecommendation);

/**
 * GET /v1/accommodation/booking?region={region}&name={name}
 * e.g.
 * GET /v1/accommodation/booking?region=ch&name=longemalle
 * */

const getBookingHotel = (req: Request, res: Response) => {
  const query = url.parse(req.url, true).query;
  const region = query.region;
  const name = query.name;

  scrapeBooking(
    encodeURI(`https://www.booking.com/hotel/${region}/${name}.html`),
  )
    .then((result: Response) => {
      if (result === -1) res.json('There was an error fetching data.');
      else res.json(result);
    })
    .catch(() => {
      res.status(404);
      res.json({
        error: {
          status: 404,
          message: 'Not Found',
        },
      });
    });
};

routes.get('/booking', getBookingHotel);

export default routes;
