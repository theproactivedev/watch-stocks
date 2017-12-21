// https://www.quandl.com/api/v3/datasets/WIKI/GOOG.json?api_key=gx3Qkf3QsZrziAAdGxrC&column_index=4&order=asc&start_date=2017-12-01&end_date=2017-12-05

export const ADD_STOCK = "ADD_STOCK";
export const FETCH_DATA_PENDING =  "FETCH_DATA_PENDING";
export const FETCH_DATA_RECEIVED = "FETCH_DATA_RECEIVED";
export const FETCH_LIST_RECEIVED = "FETCH_LIST_RECEIVED";
export const FETCH_DATA_REJECTED = "FETCH_DATA_REJECTED";
export const GET_STOCK_DATA = "GET_STOCK_DATA";
let moment = require("moment");
let pointStart = moment().subtract(3, 'months');
let startDate =  pointStart.year() + "-" + (pointStart.month() + 1) + "-" + pointStart.date();
let endDate = moment().year() + "-" + (moment().month() + 1) + "-" + moment().date();

function requestStockData() {
  return {
    type: FETCH_DATA_PENDING
  };
};

function receiveStockData(stocks, info) {
  console.log(typeof stocks);

  if (stocks !== undefined) {
    return {
      type: FETCH_DATA_RECEIVED,
      stocks,
      info
    };
  } else {
    return {
      type: FETCH_DATA_REJECTED,
      err : stocks.quandl_error.message || "Sorry. We're fixing a technical error"
    };
  }
};

function receiveStockList(data) {
  console.log(JSON.stringify(data) + " data");
  return (dispatch) => {
    for (  let i = 0; i < data.items.length; i++) {
      // console.log("From database: " + data.items[i].stock.symbol);
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
    return fetch("/stockList")
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(receiveStockList(json)));
  }
}

export function getStockData(item) {
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${item.symbol}.json?api_key=${item.identification}&order=asc&column_index=4&start_date=${startDate}&end_date=${endDate}`;

  return (dispatch) => {
    dispatch(requestStockData());
    return fetch(url)
    .then(response => response.json(),
    error => console.log(error))
    .then(json => dispatch(receiveStockData(json,
      {start: startDate, end: endDate, symbol: item.symbol})));
  };
}
