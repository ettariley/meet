import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: parseInt('32')
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount || eventCount === undefined) {
      eventCount = this.state.eventCount;
    };
    if (!location || location === undefined) {
      location = 'all';
    };
    getEvents().then((events) => {
      // filter event array by location
      let locationEvents = (location === 'all') ?
      events : 
      events.filter((event) => event.location === location);
      // set eventCount to the smaller of the locationEvents array length and specific eventCount
      eventCount = Math.min(locationEvents.length, eventCount);
      this.setState({
        eventCount: eventCount,
        events: locationEvents.slice(0, eventCount),
      });
    });
  };

  componentDidMount() {
    this.mounted = true;
    console.log("component mounted");
    getEvents().then((events) => {
      console.log()
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
 
  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
      </div>
    );
  };
}

export default App;
