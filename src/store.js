import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from 'reducers/rootReducer';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
