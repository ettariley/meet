import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { OfflineAlert } from "./Alert";
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: null,
    offlineText: ''
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

  checkOnline() {
    if (!navigator.onLine) {
      return 'No internet connection. Displaying previously viewed results.'
      // this.setState({
      //   offlineText: 
      // });
    } else {
      return ''
      // this.setState({
      //   offlineText: ''
      // });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      let firstEventList = events;
      const eventCount = Math.min(firstEventList.length, 32);
      if (this.mounted) {
        this.setState({ 
          events: firstEventList.slice(0, eventCount),
          locations: extractLocations(events), 
          eventCount: eventCount
        });
      }
    });
    
  }

  componentWillUnmount() {
    this.mounted = false;
  }
 
  render() {
    return (
      <div className="App">
        <OfflineAlert text={this.checkOnline} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  };
}

export default App;
