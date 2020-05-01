class Trip {
  constructor(
    id,
    ownerId,
    destination,
    imageUrl,
    startDate,
    endDate,
    budget,
    notes,
    transportInfo,
    accommodationInfo,
    pointsOfInterest,
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.destination = destination;
    this.imageUrl = imageUrl;
    this.startDate = startDate;
    this.endDate = endDate;
    // this.duration: difference between startDate and endDate
    this.budget = budget;
    this.notes = notes;
    this.transportInfo = transportInfo;
    this.accommodationInfo = accommodationInfo;
    this.pointsOfInterest = pointsOfInterest;
  }
}

export default Trip;
