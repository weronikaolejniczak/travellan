interface AccommodationModelParams {
  id: string;
  amenities: string[];
  breakfast: boolean;
  checkInExtra: boolean;
  checkInHours: string;
  checkOutHours: string;
  creditCardPaymentPossible: boolean;
  description: string;
  frontDesk24H: boolean;
  image: string;
  location: string;
  name: string;
  phone: string;
  reservationDetails: string;
  PDF: string;
}

const AccomodationModel = ({
  id,
  amenities,
  breakfast,
  checkInExtra,
  checkInHours,
  checkOutHours,
  creditCardPaymentPossible,
  description,
  frontDesk24H,
  image,
  location,
  name,
  phone,
  reservationDetails,
  PDF,
}: AccommodationModelParams) => ({
  id,
  amenities,
  breakfast,
  checkInExtra,
  checkInHours,
  checkOutHours,
  creditCardPaymentPossible,
  description,
  frontDesk24H,
  image,
  location,
  name,
  phone,
  reservationDetails,
  PDF,
});

export default AccomodationModel;
