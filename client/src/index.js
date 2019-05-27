import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { watchStocks, initialState } from "./reducers";
import App from "./presentational/App";
import registerServiceWorker from "./registerServiceWorker";

let store = createStore(
  watchStocks,
  initialState,
  applyMiddleware(
    thunkMiddleware
   )
);

render(
  <Provider store={store}>
    <App errorMsg={store.getState().err} />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
