const express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

let Stock = require("./models/Stock.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.route("/")
.get((req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

io.on("connection", (socket) => {
  socket.on("requestStockList", (message) => {
    if (message === "Requesting stock list") {
      Stock.find({}, (err, data) => {
        if (err) {
          console.log("Error on getting the stock symbols: " + err);
        } else {
          io.emit("stockList", {
            items: data,
            identification: process.env.API_KEY
          });
        }
      });
    }
  });

  socket.on("newStock", (stockSymbol) => {
    var stock = new Stock({
      stock : {
        symbol: stockSymbol
      }
    });

    stock.save((err) => {
  		if (err) {
  			console.log("Error on adding stock: " + err);
  		}
      io.emit("newSavedStock", {
        symbol: stockSymbol,
        identification: process.env.API_KEY
      });
  	});
  });

  socket.on("deleteStock", (stockSymbol) => {
    Stock.remove({
      "stock.symbol" : stockSymbol
    }, (err) => {
      if (err) {
        console.log("Error on deleting stock: " + err);
      }
      io.emit("deletedStock", stockSymbol);
    })
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

http.listen(process.env.PORT || 3001, () => {
  console.log("Working...");
});
