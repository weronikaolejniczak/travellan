class Accommodation {
  constructor(
    id,
    name,
    address,
    coordinates,
    imageUrl,
    description,
    reservationDetails,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.coordinates = coordinates;
    this.imageUrl = imageUrl;
    this.description = description;
    this.reservationDetails = reservationDetails;
  }
}

export default Accommodation;
