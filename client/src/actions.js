// https://www.quandl.com/api/v3/datasets/WIKI/GOOG.json?api_key=gx3Qkf3QsZrziAAdGxrC&column_index=4&order=asc&start_date=2017-12-01&end_date=2017-12-05
import io from 'socket.io-client';
let socket = io('http://localhost:3000', {'forceNew':true });

export const ADD_STOCK = "ADD_STOCK";
export const FETCH_DATA_PENDING =  "FETCH_DATA_PENDING";
export const FETCH_DATA_RECEIVED = "FETCH_DATA_RECEIVED";
export const FETCH_LIST_RECEIVED = "FETCH_LIST_RECEIVED";
export const FETCH_DATA_REJECTED = "FETCH_DATA_REJECTED";
export const GET_STOCK_DATA = "GET_STOCK_DATA";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_LIST = "CLEAR_LIST";
export const DELETE_SYMBOL = "DELETE_SYMBOL";

let moment = require("moment");
let pointStart = moment().subtract(3, 'months');
let startDate =  pointStart.year() + "-" + (pointStart.month() + 1) + "-" + pointStart.date();
let endDate = moment().year() + "-" + (moment().month() + 1) + "-" + moment().date();

function requestStockData() {
  return {
    type: FETCH_DATA_PENDING
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

export function clearList() {
  return {
    type: CLEAR_LIST
  };
}

export function deleteFromState(symbol) {
  return {
    type: DELETE_SYMBOL,
    symbol
  }
}

export function deleteFromDB(symbol) {
  socket.emit("deleteStock", symbol);
}

function receiveStockData(stocks, info) {
  if(stocks !== undefined && stocks.quandl_error !== undefined) {
    return {
      type: FETCH_DATA_REJECTED,
      err : "Sorry, we encountered a technical error. Please refresh the page."
    }
  } else {
    return {
      type: FETCH_DATA_RECEIVED,
      stocks,
      info
    };
  }
}

export function receiveStockList(data) {
  return (dispatch) => {
    dispatch(clearList());
    for (let i = 0; i < data.items.length; i++) {
      console.log("Is this running?");

      dispatch(getStockData({
        symbol : data.items[i].stock.symbol,
        identification: data.identification
      }));
    }
  }
};

export function getStockList() {
  return (dispatch) => {
    dispatch(requestStockData());
    socket.emit("requestStockList", "Requesting stock list");
  };
}

function rejectData(error) {
  return {
    type: FETCH_DATA_REJECTED,
    err : error || "Sorry. Invalid symbol."
  };
}

function isStockValid(data, symbol) {
  return (dispatch) => {
    if (data !== undefined && data.quandl_error === undefined) {
      socket.emit("newStock", symbol);
      // socket.disconnect();
    } else {
      console.log("It's valid");
      dispatch(rejectData(data.quandl_error.message));
    }
  };
}

export function checkIfStockIsValid(symbol) {
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}/data.json`;
  return (dispatch) => {
    return fetch(url)
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(isStockValid(json, symbol)));
  };
}

export function getStockData(item) {
  console.log("Get data");
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${item.symbol.toUpperCase()}.json?api_key=${item.identification}&order=asc&column_index=4&start_date=${startDate}&end_date=${endDate}`;

  return (dispatch) => {
    dispatch(requestStockData());
    return fetch(url)
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(
      receiveStockData(json, {
        start: startDate, end: endDate, symbol: item.symbol
      })
    ));
  };
}
