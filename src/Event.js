import React, { Component } from "react";

class Event extends Component {
  state = {
    show: false,
  };

  handleClick = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  
  render() {
    const { event } = this.props;

    return <div className="event">
      <ul className="event-collapsed">
        <li className="event-title">{event.summary}</li>
        <li className="event-start-date-time">{event.start.dateTime}</li>
        <li className="event-end-date-time">{event.end.dateTime}</li>
        <li className="event-organizer">{event.organizer.displayName}</li>
      </ul>
      {
        this.state.show && 
        <ul className="event-expanded">
          <li className="event-location">{event.location}</li>
          <li className="event-description">{event.description}</li>
          <li className="event-link">{event.htmlLink}</li>
        </ul>
      }
      <button type="button" className="show-hide-details" onClick={this.handleClick}>Show/Hide Details</button>
    </div>;
  }
}

export default Event;