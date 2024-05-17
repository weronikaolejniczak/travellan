interface IHotelOffer {
  guests: string;
  price: string;
}

const getHotelOffer = (offers: IHotelOffer[]) => {
  if (Array.isArray(offers) && offers.length > 0 && offers[0]) {
    const guests = offers[0].guests;
    const price = offers[0].price;

    return { guests, price };
  } else {
    return {};
  }
};

export default getHotelOffer;
