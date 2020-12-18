class Transport {
  constructor(
    id,
    isTicketTo,
    isTicketFrom,
    dateOfDeparture,
    placeOfDeparture,
    QR,
    PDF,
  ) {
    this.id = id;
    this.isTicketTo = isTicketTo;
    this.isTicketFrom = isTicketFrom;
    this.dateOfDeparture = dateOfDeparture;
    this.placeOfDeparture = placeOfDeparture;
    this.QR = QR;
    this.PDF = PDF;
  }
}

export default Transport;
