export const FETCH_BUDGET = 'FETCH_BUDGET';
export const ADD_TO_BUDGET = 'ADD_TO_BUDGET';
export const SUBTRACT_FROM_BUDGET = 'SUBTRACT_FROM_BUDGET';

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
    console.log(budget);

    dispatch({type: FETCH_BUDGET, tripId, budget});
  };
};

/** add to budget */
export const addToBudget = (tripId, amount, title) => {
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

    // ADD
    budget.value = (parseInt(budget.value, 10) + amount).toString();
    console.log('budget value ' + budget.value);
    budget.history.push({amount: amount, title: title});

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

    dispatch({type: ADD_TO_BUDGET, tripId});
  };
};

/** subtract from budget */
export const subtractFromBudget = (tripId, amount, title) => {
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

    // SUBTRACT
    budget.value = (parseInt(budget.value, 10) - amount).toString();
    console.log('budget value ' + budget.value);
    budget.history.push({amount: amount, title: title});

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

    dispatch({type: SUBTRACT_FROM_BUDGET, tripId});
  };
};
