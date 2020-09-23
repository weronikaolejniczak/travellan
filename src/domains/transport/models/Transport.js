class Transport {
  constructor(id, to, from, dateOfDeparture, placeOfDeparture, QR, PDF) {
    this.id = id;
    this.to = to; // is this a ticket to destination?
    this.from = from; // is this a ticket from destination?
    this.dateOfDeparture = dateOfDeparture;
    this.placeOfDeparture = placeOfDeparture;
    this.QR = QR;
    this.PDF = PDF;
  }
}

export default Transport;
