import React, { Component } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { deleteFromDB, deleteFromState } from "../actions.js";

class StockList extends Component {
  deleteThis(symbol) {
    deleteFromDB(symbol)
    this.props.dispatch(deleteFromState(symbol));
  }

  render() {
    let list = this.props.stockSymbols.map(symbol => {
      return (
        <ListGroup.Item as="li" action variant="light" key={symbol} className="text-dark" >
          {symbol.toUpperCase()}
          <span className="pull-right" onClick={this.deleteThis.bind(this, symbol)}>
            <i className="fa fa-times" aria-label="Delete Stock Code" aria-hidden="true"></i>
            <span className="sr-only">Delete Stock Code</span>
          </span>
        </ListGroup.Item>
      );
    });
    return (
      <ListGroup as="ul">{list}</ListGroup>
    );
  }
}

const mapStateToProps = state => {
  const { stockSymbols } = state;
  return {
    stockSymbols
  };
}

export default connect(mapStateToProps)(StockList);
