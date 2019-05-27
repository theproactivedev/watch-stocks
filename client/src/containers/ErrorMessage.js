import Alert from "react-bootstrap/Alert";
import React, { Component } from "react";
import { connect } from "react-redux";

class ErrorMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isErrorMsg: false,
    };

    this.handleDismiss = this.handleDismiss.bind(this);
    this.checkIfThereIsError = this.checkIfThereIsError.bind(this); 
  }

  handleDismiss = () => {
    this.setState({ isErrorMsg: false });
  }

  checkIfThereIsError = () => {
    if (this.props.error.length > 0 ) {
      this.setState({ isErrorMsg: true });
    }
  }

  render() {
    this.checkIfThereIsError();
    return(
      <div>
        {this.state.isErrorMsg &&
          <Alert variant="danger" onClose={this.handleDismiss} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{this.props.err} Please refresh the page.</p>
          </Alert>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { error } = state;
  return { error };
};

export default connect(mapStateToProps)(ErrorMessage);
