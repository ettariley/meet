import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from "./Alert";
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: null,
    offlineText: '',
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
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
  }

  componentWillUnmount() {
    this.mounted = false;
  }
 
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div className="App">
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  };
}

export default App;
