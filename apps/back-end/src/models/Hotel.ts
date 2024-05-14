interface HotelParams {
  amenities: string[];
  breakfast?: string[];
  checkInExtra?: string;
  checkInHours?: string;
  checkOutHours?: string;
  creditCardPaymentPossible?: boolean;
  description: string;
  dupeId?: string;
  frontDesk24H?: boolean;
  image?: string;
  location: { address: string; latitude: number; longitude: number };
  name?: string;
  offer?: string;
  phone?: string;
  rating?: number;
}

function createHotel({
  amenities,
  breakfast,
  checkInExtra,
  checkInHours,
  checkOutHours,
  creditCardPaymentPossible,
  description,
  dupeId,
  frontDesk24H,
  image,
  location,
  name,
  offer,
  phone,
  rating,
}: HotelParams) {
  return {
    amenities,
    breakfast,
    checkInExtra,
    checkInHours,
    checkOutHours,
    creditCardPaymentPossible,
    description,
    dupeId,
    frontDesk24H,
    image,
    location,
    name,
    offer,
    phone,
    rating,
  };
}

export default createHotel;
