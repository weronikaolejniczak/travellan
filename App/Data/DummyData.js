import Trip from '../Models/TripModel';

/**
 * Dummy trips
 *  [int]               id, 
    [int]               ownerId, 
    [string]            destination, 
    [string]            imageUrl, 
    [date]              startDate,
    [date]              endDate
    [float]             budget,
    [list of strings]   notes,
    [dict]              transportInfo,
    [dict]              accommodationInfo,
    [dict of dict]      pointsOfInterest
 * 
 */

const TRIPS = [
  // trip1
  new Trip(
        1, 
        1, 
        'Barcelona',
        'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80',
        new Date(2021, 1, 21),
        new Date(2021, 1, 25),
        2000.50,
        ['note1', 'note2', 'note3'],
        {},
        {},
        [{}, {}, {}, {}],
    ),
    // trip2
    new Trip(
        2, 
        1, 
        'Paris',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
        new Date(2021, 2, 13),
        new Date(2021, 2, 15),
        1450.50,
        ['note1', 'note2', 'note3'],
        {},
        {},
        [{}, {}, {}, {}],
    ),
    // trip3
    new Trip(
        3, 
        1, 
        'Tokyo',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
        new Date(2021, 4, 10),
        new Date(2021, 4, 21),
        3420.00,
        ['note1', 'note2', 'note3'],
        {},
        {},
        [{}, {}, {}, {}],
    ),
    // trip4
    new Trip(
        4, 
        1, 
        'Warsaw',
        'https://images.unsplash.com/photo-1519197924294-4ba991a11128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
        new Date(2021, 8, 27),
        new Date(2021, 8, 30),
        1505.75,
        ['note1', 'note2', 'note3'],
        {},
        {},
        [{}, {}, {}, {}],
    ),
    // trip5
    new Trip(
        5, 
        1, 
        'Milan',
        'https://images.unsplash.com/photo-1520440229-6469a149ac59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
        new Date(2021, 11, 12),
        new Date(2021, 11, 20),
        600.00,
        ['note1', 'note2', 'note3'],
        {},
        {},
        [{}, {}, {}, {}],
    ),
];

export default TRIPS;
