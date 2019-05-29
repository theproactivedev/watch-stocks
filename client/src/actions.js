import io from "socket.io-client";
import moment from "moment";
let socket = io("https://fcc-stocks.herokuapp.com/", {"forceNew":true });

export const ADD_STOCK = "ADD_STOCK";
export const FETCH_DATA_PENDING =  "FETCH_DATA_PENDING";
export const FETCH_DATA_RECEIVED = "FETCH_DATA_RECEIVED";
export const FETCH_LIST_RECEIVED = "FETCH_LIST_RECEIVED";
export const FETCH_DATA_REJECTED = "FETCH_DATA_REJECTED";
export const GET_STOCK_DATA = "GET_STOCK_DATA";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_LIST = "CLEAR_LIST";
export const DELETE_SYMBOL = "DELETE_SYMBOL";

const requestStockData = () => {
  return {
    type: FETCH_DATA_PENDING
  };
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
}

export const clearList = () => {
  return {
    type: CLEAR_LIST
  };
}

export const deleteFromState = (symbol) => {
  return {
    type: DELETE_SYMBOL,
    symbol
  }
}

export const deleteFromDB = (symbol) => {
  socket.emit("deleteStock", symbol);
}

const receiveStockData = (stocks) => {
  if(stocks === undefined) {
    return {
      type: FETCH_DATA_REJECTED,
      err : "Sorry, we encountered a technical error. Please refresh the page."
    }
  }
  return {
    type: FETCH_DATA_RECEIVED,
    stocks
  };
};

export const receiveStockList = (data) => {
  return (dispatch) => {
    dispatch(clearList());
    for (let i = 0; i < data.items.length; i++) {
      dispatch(getStockData({
        symbol : data.items[i].stock.symbol,
        identification: data.identification
      }));
    }
  }
};

export const getStockList = () => {
  return (dispatch) => {
    dispatch(requestStockData());
    socket.emit("requestStockList", "Requesting stock list");
  };
}

const rejectData = (error) => {
  return {
    type: FETCH_DATA_REJECTED,
    err : error || "Sorry. Invalid symbol."
  };
}

const isStockValid = (data, symbol) => {
  return (dispatch) => {
    if (data !== undefined && data.quandl_error === undefined) {
      socket.emit("newStock", symbol);
    } else {
      dispatch(rejectData(data.quandl_error.message));
    }
  };
}

export const checkIfStockIsValid = (symbol) => {
  let url = `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}/data.json`;
  return (dispatch) => {
    return fetch(url, {mode: "cors"})
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(isStockValid(json, symbol)));
  };
}

export const getStockData = (item) => {
  let pointStart = moment().subtract(24, "months");
  let pointEnd = moment().subtract(11, "months");
  let startDate =  pointStart.year() + "-" + pointStart.month() + "-" + pointStart.date();
  let endDate = pointEnd.year() + "-" + (pointEnd.month() + 1) + "-" + pointEnd.date();
  let url = `https://www.quandl.com/api/v3/datasets/WIKI/${item.symbol.toUpperCase().trim()}.json?api_key=${item.identification}&start_date=${startDate}&end_date=${endDate}`;

  return (dispatch) => {
    dispatch(requestStockData());
    return fetch(url, {mode: "cors"})
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(receiveStockData(json)));
  };
}
