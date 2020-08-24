class Stage {
  constructor(
    id,
    dateOfDeparture,
    hourOfDeparture,
    fromPlace,
    dateOfArrival,
    hourOfArrival,
    toPlace,
    means,
    details,
  ) {
    this.id = id;
    this.dateOfDeparture = dateOfDeparture;
    this.hourOfDeparture = hourOfDeparture;
    this.fromPlace = fromPlace;
    this.dateOfArrival = dateOfArrival;
    this.hourOfArrival = hourOfArrival;
    this.toPlace = toPlace;
    this.means = means;
    this.details = details;
  }
}

export default Stage;
