class Trip {
  constructor(
    id,
    destination,
    region,
    image,
    startDate,
    endDate,
    budget,
    notes,
    transportInfo,
    accommodationInfo,
    map,
  ) {
    this.id = id;
    this.destination = destination;
    this.region = region;
    this.image = image;
    this.startDate = startDate;
    this.endDate = endDate;
    this.budget = budget;
    this.notes = notes;
    this.transportInfo = transportInfo;
    this.accommodationInfo = accommodationInfo;
    this.map = map;
  }
}

export default Trip;
