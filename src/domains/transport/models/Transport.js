class Transport {
  constructor(id, to, from, stages, qr, pdfUri) {
    this.id = id;
    this.to = to;
    this.from = from;
    this.stages = stages;
    this.qr = qr;
    this.pdfUri = pdfUri;
  }
}

export default Transport;
