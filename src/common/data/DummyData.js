import Trip from '../models/TripModel';

/**
 * Dummy trips
 *  [int]               id,
    [string]            destination,
    [object]            region
    [string]            imageUrl,
    [date]              startDate,
    [date]              endDate,
    [float]             budget,
    [list of objects]   notes,
    [list of objects]   transportInfo,
    [list of objects]   accommodationInfo,
    [list of objects]   pointsOfInterest

    Dummy Notes:
      [int]       id,
      [string]    title,
      [string]    description,
 *
 */

const TRIPS = [
  // trip1
  new Trip(
    // id
    1,
    // destination
    'Barcelona',
    // region
    {
      latitude: 41.385063,
      longitude: 2.173404,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    // image url
    'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80',
    // start date
    '2021-06-21',
    // end date
    '2021-06-25',
    // budget
    2000.5,
    // notes
    [
      {
        id: 1,
        title: 'Hello, World!',
        description: 'Lalala, going to Barcelona!',
      },
      {
        id: 2,
        title: 'Pack',
        description: 'bathing suit, umbrella, lots of suncream',
      },
      {
        id: 3,
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra rhoncus sapien, eget pulvinar purus. Aliquam in libero nibh. Nulla nec gravida risus. Nunc mollis nisi a lacus pellentesque pharetra et vehicula tortor. Nam mattis facilisis lectus sed feugiat. Nulla nec ultrices lectus. Sed sollicitudin a nulla at pellentesque. Ut vel est leo. In sit amet ante sagittis, sollicitudin dolor at, imperdiet sem.',
      },
    ],
    // transport tickets
    [
      {
        id: 1,
        to: true,
        from: false,
        date: '2021-06-21',
        hour: '12:30',
        fromPlace: 'Poznań Airport Bukowska 285, 60-189 Poznań',
        toPlace:
          'Josep Tarradellas Barcelona-El Prat Airport, 08820 El Prat de Llobregat, Barcelona, Spain',
        means: 'airplane',
        details: {
          class: 'A',
          seat: 'E45',
          carrier: 'Ryanair',
        },
      },
      {
        id: 2,
        to: false,
        from: true,
        date: '2021-06-25',
        hour: '14:45',
        fromPlace:
          'Josep Tarradellas Barcelona-El Prat Airport, 08820 El Prat de Llobregat, Barcelona, Spain',
        toPlace: 'Poznań Airport Bukowska 285, 60-189 Poznań',
        means: 'airplane',
        details: {
          class: 'A',
          seat: 'F31',
          carrier: 'Ryanair',
        },
      },
    ],
    // accommodation
    [
      {
        id: 1,
        name: 'Hotel Barcelona 1882',
        address: '482 Carrer de Còrsega, Gràcia, 08025 Barcelona, Spain',
        coordinates: {},
        imageUrl:
          'https://r-cf.bstatic.com/images/hotel/max1024x768/171/171784314.jpg',
        description:
          "Set in Barcelona, 400 m from Sagrada Familia, Hotel Barcelona 1882 has an outdoor pool and a fitness center. The 4-star hotel has air-conditioned rooms with a private bathroom and free WiFi. At the hotel, each room comes with a desk. The rooms are fitted with a flat-screen TV, and certain rooms include a city view. All rooms feature a wardrobe. A buffet breakfast with show cooking is served every morning at the property. Hotel Barcelona 1882 offers a terrace with views of Sagrada Familia. Every Wednesday morning free yoga classes are available for guests. Staff are ready to help around the clock. Free walking tours of the Eixample and Sagrada Familia's surrounding are offered every Saturday. Guest can use the free bicycle service. La Pedrera is a 14-minute walk from the accommodations. The nearest airport is Barcelona El Prat Airport, 8.7 mi from Hotel Barcelona 1882. This is our guests' favorite part of Barcelona, according to independent reviews. Couples in particular like the location – they rated it 9.0 for a two-person trip.",
        reservationDetails: {},
      },
    ],
    // points of interest
    [],
  ),
  // trip2
  new Trip(
    2,
    'Paris',
    {
      latitude: 48.864716,
      longitude: 2.349014,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
    '2021-02-13',
    '2021-02-15',
    1450.5,
    [{id: 1, title: 'Hello, World!', description: 'Lalala, going to Paris!'}],
    [
      {
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
      },
      {
        id: 2,
        to: false,
        from: true,
        date: '2021-02-15',
        hour: '11:30',
        fromPlace: 'Paris-Charles De Gaulle, 95700 Roissy-en-France, France',
        toPlace: 'Poznań Airport Bukowska 285, 60-189 Poznań',
        means: 'airplane',
        details: {
          class: 'B',
          seat: 'C11',
          carrier: 'Wizzair',
        },
      },
    ],
    [],
    [],
  ),
  // trip3
  new Trip(
    3,
    'Tokyo',
    {
      latitude: 35.689487,
      longitude: 139.691711,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    '2021-04-10',
    '2021-04-21',
    3420.0,
    [{id: 1, title: 'Hello, World!', description: 'Lalala, going to Tokyo!'}],
    [],
    [],
    [],
  ),
  // trip4
  new Trip(
    4,
    'Warsaw',
    {
      latitude: 52.229675,
      longitude: 21.01223,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    'https://images.unsplash.com/photo-1519197924294-4ba991a11128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    '2021-08-27',
    '2021-08-30',
    1505.75,
    [{id: 1, title: 'Hello, World!', description: 'Lalala, going to Warsaw!'}],
    [],
    [],
    [],
  ),
  // trip5
  new Trip(
    5,
    'Milan',
    {
      latitude: 45.464203,
      longitude: 9.189982,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    'https://images.unsplash.com/photo-1520440229-6469a149ac59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    '2021-11-12',
    '2021-11-20',
    600.0,
    [{id: 1, title: 'Hello, World!', description: 'Lalala, going to Milan!'}],
    [],
    [],
    [],
  ),
];

export default TRIPS;
