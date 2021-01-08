class Accommodation {
  constructor(
    id,
    name,
    address,
    ammenities,
    hotelHours,
    coordinates,
    image,
    description,
    reservationDetails,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.ammenities = ammenities;
    this.hotelHours = hotelHours;
    this.coordinates = coordinates;
    this.image = image;
    this.description = description;
    this.reservationDetails = reservationDetails;
  }
}

export default Accommodation;
