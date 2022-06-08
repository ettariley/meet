import React from "react";
import { shallow, mount } from 'enzyme';
import App from "../App";
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

});

describe('<App /> integration', () => {
  test('App passes "events" as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    let eventCount = AppWrapper.state('eventCount');
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    eventCount = Math.min(eventsToShow.length, eventCount);
    const eventsByCount = eventsToShow.slice(0, eventCount);
    expect(AppWrapper.state('events')).toEqual(eventsByCount);
    AppWrapper.unmount();
  });

  test('get list of all events when user selected "See All Cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    let eventCount = AppWrapper.state('eventCount');
    eventCount = Math.min(allEvents.length, eventCount);
    const eventsByCount = allEvents.slice(0, eventCount);
    expect(AppWrapper.state('events')).toEqual(eventsByCount);
    AppWrapper.unmount();
  })

  test('App passes "eventCount" as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('eventCount');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().eventCount).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

});