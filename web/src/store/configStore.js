import { createStore } from "redux";
import { compose } from 'redux';

import rootReducer from "../reducers";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,composeEnhancer()
  );
}