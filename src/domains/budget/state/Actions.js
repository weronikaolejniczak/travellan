export const FETCH_BUDGET = 'FETCH_BUDGET';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';

/** fetch budget */
export const fetchBudget = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    // await json body of response
    const resData = await response.json();

    // take budget stored in the trip and assign it to local variable for later logic
    let budget = resData.budget;

    dispatch({type: FETCH_BUDGET, tripId, budget});
  };
};

/** update budget */
export const updateBudget = (tripId, updatedBudget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    // await json body of response
    const resData = await response.json();

    // take budget stored in the trip and assign it to local variable for later logic
    let budget = resData.budget;

    // update budget
    budget = updatedBudget === [] ? undefined : updatedBudget;

    // PATCH updates some of the keys for a defined path without replacing all of the data
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
