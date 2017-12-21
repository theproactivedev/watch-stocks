import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export function displayNewStock(cb) {
  socket.on("newSavedStock", (value => {
    cb(value);
  }));
}
