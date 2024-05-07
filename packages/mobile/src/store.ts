import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';

import rootReducer from 'reducers/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
