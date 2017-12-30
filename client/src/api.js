import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export function displayNewStock(cb) {
  socket.on("newSavedStock", (value => {
    cb(value);
  }));
}

export function deleteStock(cb) {
  socket.on("deletedStock", (value => {
    cb(value);
  }));
}

export function receiveList(cb) {
  socket.on("stockList", (value => {
    console.log("Receiving stock list happening");
    cb(value);
  }));
}
