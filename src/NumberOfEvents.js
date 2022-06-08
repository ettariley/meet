import React, { Component } from "react";

class NumberOfEvents extends Component {

  state = {
    eventCount: 32
  };
  
  handleNumberChanged = (event) => {
    const value = parseInt(event.target.value);
    console.log(value);
    if (value < 1 || value > 32) {
      alert("Number of events must be between 1 and 32")
    } else {
      this.setState({
        eventCount: value,
      });
      this.props.updateEvents(null, value);
      console.log(value, this.state.eventCount);
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
      </div>
    );
  }
}

export default NumberOfEvents;