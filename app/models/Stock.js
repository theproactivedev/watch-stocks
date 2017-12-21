'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
  stock: {
    type: {
      symbol: String
    }
  }
});

module.exports = mongoose.model('Stock', StockSchema);
