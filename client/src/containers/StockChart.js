import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Fade from "react-reveal/Fade";
import ClipLoader from "react-spinners/ClipLoader";
import { displayNewStock, deleteStock, receiveList } from "../api.js";
import {
  getStockData,
  getStockList,
  clearList,
  deleteFromState,
  receiveStockList
 } from "../actions.js";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class StockChart extends Component {

  constructor(props) {
    super(props);
    // When user adds new stock, deletes a stock in the app, visits the app,
    // the app will add stock, delete stock and store an array of stocks in the redux store respectively.
    displayNewStock(value => this.props.dispatch(getStockData(value))); 
    deleteStock(value => this.props.dispatch(deleteFromState(value))); 
    receiveList(value => this.props.dispatch(receiveStockList(value)));
  }

  componentDidMount() {     
    this.props.dispatch(getStockList());
  }

  componentWillUnmount() {
    this.props.dispatch(clearList());
  }

  render() {
    const { startDate, endDate, stockList, isFetching } = this.props;
    let startDateString = new Date(startDate);
    let endDateString = new Date(endDate);
    let chartTitle = "Stock Prices from " + months[startDateString.getMonth()] + " " + startDateString.getFullYear() + " to " + months[endDateString.getMonth()] + " " + endDateString.getFullYear();

    let chartOptions = {
      chart : {
        type: "line",
        style: { 
          color: "#fff"
        }
      },
      title: {
        text: chartTitle,
        style: {
          color: "#fff"
        } 
      },
      xAxis: {
        title: {
          text: "Number of Records",
          style: {
            color: "#fff"
          }
        },
        labels: {
          style: {
            color: "#fff"
          }
        },
      },
      yAxis: {
        title: {
          text: "Amount in USD",
          style: {
            color: "#fff"
          }
        },
        labels: {
          style: {
            color: "#fff"
          },
          formatter: function() {
            return "$ " + this.value;
          }
        }
      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              opacity: 1
            }
          }
        }
      },
      legend: {
        itemStyle: {
          color: "#fff",
          fontWeight: "bold"
        }
      },
      tooltip: {
        backgroundColor: "#fff",
        crosshairs: true
      },      
      series: stockList
    };

    return (
      <div id="stockChart" className="py-4 mb-4">
        <div className="text-center">
          <ClipLoader
            sizeUnit={"px"}
            size={100}
            color={"#fff"}
            loading={isFetching}
          />
        </div>
        {!isFetching &&
          <Fade bottom><HighchartsReact highcharts={Highcharts} options={chartOptions} /></Fade>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { stockList, startDate, endDate, isFetching } = state;
  return {
    stockList,
    startDate,
    endDate, isFetching
  };
}

export default connect(mapStateToProps)(StockChart);
