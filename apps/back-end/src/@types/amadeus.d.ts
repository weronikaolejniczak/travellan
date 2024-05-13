declare module 'amadeus' {
  interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: string;
  }

  class Amadeus {
    constructor(options: AmadeusOptions);

    // Methods exported by Amadeus
  }

  export default Amadeus;
}
