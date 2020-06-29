/* {
    id: 0,
    dateOfDeparture: '2021-02-14',
    hourOfDeparture: '2:35'
    fromPlace: 'Poznań Główny railway station, Dworcowa 2, 61-801 Poznań',
    dateOfArrival: '2021-02-13',
    hourOfArrival: '6:45',
    toPlace: "Gare Saint-Lazare, 13 Rue d'Amsterdam, 75008 Paris, France",
    means: 'train',
    details: {
      carriage: '13',
      seat: '61',
    },
} */
class TransportStage {
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

export default TransportStage;
