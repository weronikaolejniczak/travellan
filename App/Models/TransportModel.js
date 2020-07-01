/* {
    id: 1,
    to: true,
    from: false,
    stages: [
      {
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
      }
    ]
  }, */
class Transport {
  constructor(
    id,
    to,
    from,
    stages,
    /* date, hour, fromPlace, toPlace, means, details */
  ) {
    this.id = id;
    this.to = to;
    this.from = from;
    this.stages = stages;
    /* this.date = date;
    this.hour = hour;
    this.fromPlace = fromPlace;
    this.toPlace = toPlace;
    this.means = means;
    this.details = details; */
  }
}

export default Transport;
