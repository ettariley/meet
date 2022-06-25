import React from "react";
import Event from './Event';

function EventList(props) {
  const { events } = props;
  return (
    <div>
      <h4>Events</h4>
      <ul className="EventList">
        {events.map(event => 
          <li key={event.id}>
            <Event event={event} />
          </li>)}
      </ul>
    </div>
    
  );
}

export default EventList;