import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  handleNumberChanged = (number) => {
    const value = number.target.value;
    this.setState({
      number: value,
    });
  };
  
  render() {
    return (
      <div className="number-of-events">
        <input 
            type="number"
            className="number"
            value={this.state.number}
            onChange={this.handleNumberChanged}
          />
      </div>
    );
  }
}

export default NumberOfEvents;