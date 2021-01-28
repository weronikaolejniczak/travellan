class Accommodation {
  constructor(
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
  ) {
    this.id = id;
    this.amenities = amenities;
    this.breakfast = breakfast;
    this.checkInExtra = checkInExtra;
    this.checkInHours = checkInHours;
    this.checkOutHours = checkOutHours;
    this.creditCardPaymentPossible = creditCardPaymentPossible;
    this.description = description;
    this.frontDesk24H = frontDesk24H;
    this.image = image;
    this.location = location;
    this.name = name;
    this.phone = phone;
    this.reservationDetails = reservationDetails;
    this.PDF = PDF;
  }
}

module.exports = Accommodation;
