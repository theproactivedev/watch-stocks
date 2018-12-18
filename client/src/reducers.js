import {
  FETCH_DATA_PENDING,
  FETCH_DATA_RECEIVED,
  FETCH_DATA_REJECTED,
  CLEAR_ERROR,
  CLEAR_LIST,
  DELETE_SYMBOL
} from './actions.js';

let colors = ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'];
let index = -1;

export const initialState = {
  isFetching: false,
  currentStock: "",
  stockSymbols: [],
  stockList: [],
  startDate: "",
  endDate: "",
  error: ""
};

function addStock(item) {
  let prices = [];

  if (item !== undefined && item.dataset !== undefined) {
    for (let i=0; i < item.dataset.data.length; i++) {
      prices.push(item.dataset.data[i][4]);
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

export function watchStocks(state=initialState, action) {
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
        startDate: action.info.start,
        endDate: action.info.end,
        currentStock: action.info.symbol,
        error: "",
        stockSymbols: [
          ...state.stockSymbols,
          action.info.symbol
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
