import {FIREBASE_URL} from 'react-native-dotenv';

export const FETCH_BUDGET = 'FETCH_BUDGET';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';

const API_URL = FIREBASE_URL;

export const fetchBudget = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let budget = resData.budget;

    dispatch({type: FETCH_BUDGET, tripId, budget});
  };
};

export const updateBudget = (tripId, updatedBudget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let budget = resData.budget;

    budget = updatedBudget === [] ? undefined : updatedBudget;

    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget,
        }),
      },
    );

    dispatch({type: UPDATE_BUDGET, tripId, budget});
  };
};
