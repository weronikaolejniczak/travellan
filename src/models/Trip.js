class Trip {
  constructor(
    id,
    destination,
    region,
    image,
    startDate,
    endDate,
    transport,
    accommodation,
    budget,
    notes,
    map,
  ) {
    this.id = id;
    this.destination = destination;
    this.region = region;
    this.image = image;
    this.startDate = startDate;
    this.endDate = endDate;
    this.transport = transport;
    this.accommodation = accommodation;
    this.budget = budget;
    this.notes = notes;
    this.map = map;
  }
}

export default Trip;
