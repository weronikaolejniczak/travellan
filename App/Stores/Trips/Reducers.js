import TRIPS from '../../Data/DummyData'

const initialState = {
    availableTrips: TRIPS,
    userTrips: TRIPS.filter(trip => trip.ownerId === 1),
};

export default (state = initialState, actions) => {
    return state;
};