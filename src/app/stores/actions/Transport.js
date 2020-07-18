import Transport from '../../models/TransportModel';

export const SET_TRANSPORT = 'SET_TRANSPORT';
export const DELETE_TRANSPORT = 'DELETE_TRANSPORT';
export const CREATE_TRANSPORT = 'CREATE_TRANSPORT';

/** 'fetch transport' action based on id of trip */
export const fetchTransport = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    // await json body of response
    const resData = await response.json();

    // take transportInfo stored in the trip and assign it to local variable for later logic
    let transportInfo = resData.transportInfo;

    dispatch({type: SET_TRANSPORT, tripId, transportInfo});
  };
};

/** 'delete a ticket' action based on id of the ticket */
export const deleteTransport = (tripId, ticketId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    // await json body of response
    const resData = await response.json();

    // take transportInfo stored in the trip and assign it to local variable for later logic
    let transportInfo = resData.transportInfo;

    // change transportInfo to exclude the ticket we want to delete
    // with the help of ticketId
    transportInfo = transportInfo.filter((item) => !(item.id === ticketId));

    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transportInfo,
        }),
      },
    );

    dispatch({type: DELETE_TRANSPORT, tripId});
  };
};

/* {
    id: 1,
    to: true,
    from: false,
    stages: [
      {
        dateOfDeparture: '2021-02-14',
        hourOfDeparture: '2:35'
        fromPlace: 'Poznań Główny railway station, Dworcowa 2, 61-801 Poznań',
        dateOfArrival: '2021-02-13',
        hourOfArrival: '6:45',
        toPlace: "Gare Saint-Lazare, 13 Rue d'Amsterdam, 75008 Paris, France",
        means: 'train',
        details: {
          carriage: '13',
          seat: '61',
        },
      }
    ]
  }, */
/** 'create a ticket' action based on user input */
export const createTransport = (tripId, to, from, stages) => {
  const newTransport = new Transport(
    new Date().toString(), // DUMMY ID
    to,
    from,
    stages,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    // await json body of response
    const resData = await response.json();

    // take transportInfo stored in the trip and assign it to local variable for later logic
    let transportInfo = resData.transportInfo;

    transportInfo === undefined
      ? (transportInfo = [newTransport])
      : (transportInfo = transportInfo.concat(newTransport));

    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transportInfo,
        }),
      },
    );

    dispatch({
      type: CREATE_TRANSPORT,
      tripId,
      transportInfo,
    });
  };
};
