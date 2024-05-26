interface TransportModelParams {
  PDF: string;
  QR: string;
  dateOfDeparture: Date;
  id: string;
  isTicketFrom: boolean;
  isTicketTo: boolean;
  placeOfDeparture: string;
}

const TransportModel = ({
  PDF,
  QR,
  dateOfDeparture,
  id,
  isTicketFrom,
  isTicketTo,
  placeOfDeparture,
}: TransportModelParams) => ({
  PDF,
  QR,
  dateOfDeparture,
  id,
  isTicketFrom,
  isTicketTo,
  placeOfDeparture,
});

export default TransportModel;
