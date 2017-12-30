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
app.use(express.static(path.join(__dirname, 'client/build')));

app.route("/")
.get(function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', function(socket) {

  socket.on("requestStockList", function(message) {
    console.log("Request stock list is happening");
    if (message === "Requesting stock list") {
      Stock.find({}, function(err, data) {
        if (err) {
          console.log("Error on getting the stock symbols: " + err);
        } else {
          console.log("Emitting stock list happening");
          io.emit("stockList", {
            items: data,
            identification: process.env.API_KEY
          });
        }
      });
    }
  });

  socket.on("newStock", function(stockSymbol) {
    var stock = new Stock({
      stock : {
        symbol: stockSymbol
      }
    });

    stock.save(function(err) {
  		if (err) {
  			console.log("Error on adding stock: " + err);
  		}
      io.emit("newSavedStock", {
        symbol: stockSymbol,
        identification: process.env.API_KEY
      });
  	});
  });

  socket.on("deleteStock", function(stockSymbol) {
    Stock.remove({
      "stock.symbol" : stockSymbol
    }, function(err) {
      if (err) {
        console.log("Error on deleting stock: " + err);
      }
      io.emit("deletedStock", stockSymbol);
    })
  });

  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
});

http.listen(process.env.PORT || 3001, function() {
  console.log("Working...");
});
