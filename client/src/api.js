import io from "socket.io-client";
const socket = io("http://eg-fcc-stocks.herokuapp.com/");

export const displayNewStock = (cb) => {
  socket.on("newSavedStock", ((value) => {
    cb(value);
  }));
}

export const deleteStock = (cb) => {
  socket.on("deletedStock", ((value) => {
    cb(value);
  }));
}

export const receiveList = (cb) => {
  socket.on("stockList", ((value) => {
    cb(value);
  }));
}
