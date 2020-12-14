class Transport {
  constructor(id, to, from, dateOfDeparture, placeOfDeparture, qr, pdfUri) {
    this.id = id;
    this.to = to;
    this.from = from;
    this.dateOfDeparture = dateOfDeparture;
    this.placeOfDeparture = placeOfDeparture;
    this.qr = qr;
    this.pdfUri = pdfUri;
  }
}

export default Transport;
