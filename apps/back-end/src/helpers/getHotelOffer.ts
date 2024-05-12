const getHotelOffer = (offers) => {
  if (Array.isArray(offers) && offers.length > 0) {
    const guests = offers[0].guests;
    const price = offers[0].price;

    return { guests, price };
  } else {
    return {};
  }
};

export default getHotelOffer;
