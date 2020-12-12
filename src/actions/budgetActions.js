import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

export const SET_BUDGET = 'SET_BUDGET';

const API_URL = FIREBASE_URL;

export const setBudget = (tripId, budget) => {
  return {
    type: SET_BUDGET,
    tripId,
    budget,
  };
};

export const fetchBudgetRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let budget = data.budget;

    dispatch(setBudget(tripId, budget));
  };
};

export const updateBudgetRequest = (tripId, updatedBudget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let budget = data.budget;
    budget = updatedBudget === [] ? undefined : updatedBudget;

    await axios.patch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {budget},
    );

    dispatch(setBudget(tripId, budget));
  };
};
