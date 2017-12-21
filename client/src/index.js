import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
  watchStocks,
  initialState
} from './reducers';
import App from './presentational/App';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();

let store = createStore(
  watchStocks,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
