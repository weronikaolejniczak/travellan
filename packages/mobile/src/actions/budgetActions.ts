import axios from 'axios';
import { FIREBASE_URL } from 'react-native-dotenv';

import Budget from 'models/Budget';

export const SET_BUDGET = 'SET_BUDGET';

const API_URL = FIREBASE_URL;

export const setBudget = (tripId, budget) => {
  return {
    budget,
    tripId,
    type: SET_BUDGET,
  };
};

export const fetchBudgetRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(`${API_URL}/Trips/${userId}/${tripId}/budget.json?auth=${token}`)
      .then((res) => res.data)
      .then((budget) => {
        const loadedBudget = [];
        for (const key in budget) {
          loadedBudget.push(
            new Budget(
              key,
              budget[key].value,
              budget[key].currency,
              budget[key].history,
              budget[key].defaultAccount,
            ),
          );
        }

        dispatch(setBudget(tripId, loadedBudget));
      })
      .catch(() => {
        throw new Error('Something went wrong while getting your budget!');
      });
  };
};

export const patchBudgetRequest = (tripId, budget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .patch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
        budget,
      })
      .then(() => dispatch(setBudget(tripId, budget)))
      .catch(() => {
        throw new Error("Couldn't update the budget!");
      });
  };
};
