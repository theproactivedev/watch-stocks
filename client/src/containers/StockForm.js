import React, { Component } from 'react';
import {
  Form, FormGroup, InputGroup, Col, Button, FormControl
} from 'react-bootstrap';
import io from 'socket.io-client';

class StockForm extends Component {

  handleSubmit() {
    if (this.input.value.length > 0) {
      const socket = io('http://localhost:3000');
      socket.emit("newStock", this.input.value);
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
      <div>
      {formInstance}
      </div>
    );
  }
}

export default StockForm;
