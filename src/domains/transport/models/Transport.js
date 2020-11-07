class Transport {
  constructor(id, to, from, dateOfDeparture, placeOfDeparture, qr, pdfUri) {
    this.id = id;
    this.to = to; // is this a ticket to destination?
    this.from = from; // is this a ticket from destination?
    this.dateOfDeparture = dateOfDeparture;
    this.placeOfDeparture = placeOfDeparture;
    this.qr = qr;
    this.pdfUri = pdfUri;
  }
}

export default Transport;
