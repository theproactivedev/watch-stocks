import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';
import { displayNewStock, deleteStock, receiveList } from '../api.js';
import { connect } from 'react-redux';
import {
  getStockData,
  getStockList,
  clearList,
  deleteFromState,
  receiveStockList
 } from '../actions.js';
import '../css/stockchart.css';

class StockChart extends Component {

  constructor(props) {
    super(props);
    displayNewStock(value => this.props.dispatch(getStockData(value)));
    deleteStock(value => this.props.dispatch(deleteFromState(value)));
    receiveList(value => this.props.dispatch(receiveStockList(value)));
  }

  componentWillMount() {
    this.props.dispatch(clearList());
  }

  componentDidMount() {
    console.log("Getting stock list happening");
    this.props.dispatch(getStockList());
  }

  render() {
    let startDate = this.props.startDate.split("-");
    let chartOptions = {
      chart : {
        type: "line"
      },
      title: {
        text: 'Stock Prices for January to March of this Year'
      },
      xAxis: {
        type: 'datetime'
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(startDate[0], startDate[1], startDate[2]),
          pointInterval: 24 * 3600 * 1000,
          marker: {
            enabled: false
          }
        }
      },
      yAxis: {
        title: {
          text: 'Amount in USD'
        }
      },
      series: this.props.stockList
    };

    return (
      <div>
        <div id="stockChart">
          <ReactHighCharts config={chartOptions} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { stockList, startDate } = state;
  return {
    stockList,
    startDate
  };
}

export default connect(mapStateToProps)(StockChart);
