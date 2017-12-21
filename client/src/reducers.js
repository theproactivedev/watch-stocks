import {
  FETCH_DATA_PENDING,
  FETCH_DATA_RECEIVED,
  FETCH_DATA_REJECTED
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
      prices.push(item.dataset.data[i][1]);
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
    default :
      return state;
  }
};
