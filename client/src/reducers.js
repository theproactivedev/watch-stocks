import {
  FETCH_DATA_PENDING,
  FETCH_DATA_RECEIVED,
  FETCH_DATA_REJECTED,
  CLEAR_ERROR,
  CLEAR_LIST,
  DELETE_SYMBOL
} from "./actions.js";

let colors = ["#f45b5b", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#2b908f", "#90ee7e"];
let index = 1;

export const initialState = {
  isFetching: false,
  currentStock: "",
  stockSymbols: [],
  stockList: [],
  startDate: "",
  endDate: "",
  error: ""
};

const addStock = (item) => {
  let prices = [];
  if (item !== undefined && item.dataset !== undefined) {
    for (let i=item.dataset.data.length-1; i > -1; i--) {
      prices.push([item.dataset.data[i][0], item.dataset.data[i][4]]);
    }

    return {
      name: item.dataset.dataset_code,
      data: prices,
      color: colors[index++]
    };
  }

  return {
    name: "",
    data: []
  };
}

export const watchStocks = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_PENDING :
      return {
        ...state,
        isFetching: true,
        error: ""
      }
    case FETCH_DATA_RECEIVED :
      return {
        ...state,
        isFetching: false,
        startDate: action.stocks.dataset.data[action.stocks.dataset.data.length-1][0],
        endDate: action.stocks.dataset.data[0][0],
        currentStock: action.stocks.dataset.dataset_code,
        error: "",
        stockSymbols: [
          ...state.stockSymbols,
          action.stocks.dataset.dataset_code
        ],
        stockList: [
          ...state.stockList,
          addStock(action.stocks)
        ]
      }
    case FETCH_DATA_REJECTED :
      return {
        ...state,
        isFetching: false,
        error: action.err
      }
    case DELETE_SYMBOL :
      return {
        ...state,
        stockSymbols: state.stockSymbols.filter(symbol =>
          symbol.toUpperCase() !== action.symbol.toUpperCase()
        ),
        stockList: state.stockList.filter(item =>
          item.name.toUpperCase() !== action.symbol.toUpperCase()
        )
      }
    case CLEAR_ERROR :
      return {
        ...state,
        isFetching: false,
        error: ""
      }
    case CLEAR_LIST :
      return {
        isFetching: false,
        currentStock: "",
        stockSymbols: [],
        stockList: [],
        startDate: "",
        endDate: "",
        error: ""
      }
    default :
      return state;
  }
};
