import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { checkIfStockIsValid, clearError } from "../actions.js";
import { connect } from "react-redux";

class StockForm extends Component {

  constructor() {
    super();

    this.state = {
      input: "",
      warning: ""
    };

    this.isSymbolAlreadyExists = this.isSymbolAlreadyExists.bind(this);
    this.hideWarning = this.hideWarning.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleInputChange(e) {
    this.setState({ input: e.target.value.toUpperCase() });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input.length > 0 && !this.isSymbolAlreadyExists(this.state.input)) {
      this.props.onSubmit(this.state.input);
    }
    this.setState({ input: "" });
  }

  render() {
    const formInstance = (  
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group>
          <Row>
            <Col xs md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} >
              <InputGroup className="mb-3">
                <FormControl className="d-inline" type="text" placeholder="Enter stock code" onChange={(e) => this.handleInputChange(e)} aria-label="Enter stock code you want to display on the chart" />
                <InputGroup.Append>
                  <Button type="submit" variant="light" className="d-inline" aria-label="Add stock code">Add</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    );

    return (
      <div className="form">
        {this.state.warning !== "" &&
          <Alert variant = "danger" onClick={this.hideWarning}>
            <p className="error">{this.state.warning}</p>
          </Alert>
        }
        {this.props.error !== "" &&
          <Alert variant = "danger" onClick={this.hideWarning}>
            <p className="error">{this.props.error}</p>
          </Alert>
        }
        <div>{formInstance}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { stockSymbols, error } = state;

  return {
    stockSymbols, error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (symbol) => {
      dispatch(checkIfStockIsValid(symbol))
    },
    clearWarning : () => { dispatch(clearError()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockForm);
