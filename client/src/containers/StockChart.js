import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';
import { Panel } from 'react-bootstrap';
import { displayNewStock } from '../api.js';
import { connect } from 'react-redux';
import {
  getStockData,
  getStockList
 } from '../actions.js';

class StockChart extends Component {

  constructor() {
    super();
    displayNewStock(value => this.props.dispatch(getStockData(value)));
  }

  componentWillMount() {
    this.props.dispatch(getStockList());
  }

  render() {
    let startDate = this.props.startDate.split("-");
    let chartOptions = {
      chart : {
        type: "line"
      },
      title: {
        text: 'Stock Prices for the Last Three Months'
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
    var onError = this.props.error !== "";

    return (
      <div>
      {onError &&
        <Panel bsStyle="danger">
          {this.props.error}
        </Panel>
      }

      {!onError &&
        <div id="stockChart">
          <ReactHighCharts config={chartOptions} />
        </div>
      }
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { stockList, startDate, error } = state;
  return {
    stockList,
    startDate,
    error
  };
}

export default connect(mapStateToProps)(StockChart);
