const express = require("express");
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});

let Stock = require("./app/models/Stock.js");
// Stock.remove({}, (err) => {
//   console.log(err);
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.route("/")
.get(function(req, res) {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

io.on('connection', function(socket) {

  socket.on("newStock", function(stockSymbol) {
    var stock = new Stock({
      stock : {
        symbol: stockSymbol
      }
    });

    stock.save(function(err) {
  		if (err) {
  			console.log(err);
  		}
  	});

    io.emit("newSavedStock", {symbol: stockSymbol, identification: process.env.REACT_APP_API_KEY});
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.route("/stockList")
.get(function(req, res) {
  Stock.find({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({items: data, identification: process.env.REACT_APP_API_KEY});
    }
  })
});

http.listen(process.env.PORT || 3001, function() {
  console.log("Working...");
});
