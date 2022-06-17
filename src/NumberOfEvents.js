import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {

  state = {
    eventCount: 32,
  };
  
  handleNumberChanged = (event) => {
    const value = parseInt(event.target.value);
    if (value < 1 || value > 32) {
      this.setState({
        errorText: 'Number of events must be between 1 and 32'
      });
    } else {
      this.setState({
        eventCount: value,
        errorText: ''
    });
    this.props.updateEvents(null, value);
    this.setState({
      errorText: ''
    });
    }
  };
  
  render() {
    return (
      <div className="number-of-events">
        <input 
            type="number"
            className="number"
            value={this.state.eventCount}
            onChange={this.handleNumberChanged}
          />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;