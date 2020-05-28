/* {
    id: 1,
    to: true,
    from: false,
    date: '2021-02-13',
    hour: '6:45',
    fromPlace: 'Poznań Główny railway station, Dworcowa 2, 61-801 Poznań',
    toPlace: "Gare Saint-Lazare, 13 Rue d'Amsterdam, 75008 Paris, France",
    means: 'train',
    details: {
      carriage: '13',
      seat: '61',
    },
  }, */
class Transport {
  constructor(id, to, from, date, hour, fromPlace, toPlace, means, details) {
    this.id = id;
    this.to = to;
    this.from = from;
    this.date = date;
    this.hour = hour;
    this.fromPlace = fromPlace;
    this.toPlace = toPlace;
    this.means = means;
    this.details = details;
  }
}

export default Transport;
