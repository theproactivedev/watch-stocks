import React, { Component } from 'react';
import {
  Form, FormGroup, InputGroup, Col, Button, FormControl, Panel
} from 'react-bootstrap';
import { checkIfStockIsValid, clearError } from '../actions.js';
import { connect } from 'react-redux';

class StockForm extends Component {

  constructor() {
    super();

    this.state = {
      warning: ""
    };

    this.isSymbolAlreadyExists = this.isSymbolAlreadyExists.bind(this);
    this.hideWarning = this.hideWarning.bind(this);
  }

  hideWarning() {
    this.props.clearWarning();
    this.setState({
      warning: ""
    });
  }

  isSymbolAlreadyExists(symbol) {
    for (let i = 0; i < this.props.stockSymbols.length; i++) {
      if (symbol.toUpperCase() === this.props.stockSymbols[i].toUpperCase()) {
        this.setState({
          warning: "It already exists in the database."
        })
        return true;
      }
    }

    return false;
  }

  handleSubmit() {
    if (this.input.value.length > 0 && !this.isSymbolAlreadyExists(this.input.value)) {
      this.props.onSubmit(this.input.value);
    }
    this.input.value = "";
  }

  render() {
    const formInstance = (  
      <Form horizontal>
        <FormGroup>
          <Col xs={12} mdOffset={2} md={8} lgOffset={3} lg={6} >
          <InputGroup>
            <FormControl type="text" placeholder="Enter stock symbol" inputRef={(ref) => {this.input = ref}} />
            <InputGroup.Button>
              <Button onClick={this.handleSubmit.bind(this)}>Add</Button>
            </InputGroup.Button>
          </InputGroup>
          </Col>
        </FormGroup>
      </Form>
    );

    return (
      <div className="form">
        {this.state.warning !== "" &&
          <Panel bsStyle="danger" onClick={this.hideWarning}>
            <p className="error">{this.state.warning}</p>
          </Panel>
        }
        {this.props.error !== "" &&
          <Panel bsStyle="danger" onClick={this.hideWarning}>
            <p className="error">{this.props.error}</p>
          </Panel>
        }
        <div>
          {formInstance}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { stockSymbols, error } = state;

  return {
    stockSymbols, error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (symbol) => {
      dispatch(checkIfStockIsValid(symbol))
    },
    clearWarning : () => { dispatch(clearError()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockForm);
