import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import '../css/stocklist.css';
import { deleteFromDB } from '../actions.js';

class StockList extends Component {
  deleteThis(symbol) {
    deleteFromDB(symbol);
  }

  render() {
    let list = this.props.stockSymbols.map(symbol => {
      return (
        <Col xs={12} md={6} lg={4} key={symbol}>
          <li className="">{symbol.toUpperCase()}<span className="pull-right" onClick={this.deleteThis.bind(this, symbol)}><i className="fa fa-times-circle" aria-hidden="true"></i></span></li>
        </Col>
      );
    });
    return (
      <div><ul>{list}</ul></div>
    );
  }
}

function mapStateToProps(state) {
  const { stockSymbols } = state;

  return {
    stockSymbols
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     onSubmit: (item) => {
//       dispatch(getStockData(item))
//     },
//     clearWarning : () => { dispatch(clearError()) }
//   }
// }

export default connect(mapStateToProps)(StockList);
