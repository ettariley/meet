import React from "react";
import { shallow } from 'enzyme';
import { mockData } from "../mock-data";
import Event from '../Event';

describe('<Event /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  })

  test('render collapsed event', () => {
    expect(EventWrapper.find(".event-collapsed")).toHaveLength(1);
  });

  test('event expanded is hidden by default', () => {
    expect(EventWrapper.find(".event-expanded")).toHaveLength(0);
  });

  test('expand event details on button click', () => {
    EventWrapper.setState({ show: false });
    EventWrapper.find('.show-hide-details').simulate('click');
    expect(EventWrapper.find(".event-expanded")).toHaveLength(1);
  });

  test('collapse event details on button click when expanded', () => {
    EventWrapper.setState({ show: true });
    EventWrapper.find('.show-hide-details').simulate('click');
    expect(EventWrapper.find(".event-expanded")).toHaveLength(0);
  });

  test('event title renders correctly', () => {
    expect(EventWrapper.find('.event-title').text()).toEqual(mockData[1].summary);
  });

  test('event start date time renders correctly', () => {
    expect(EventWrapper.find('.event-start-date-time').text()).toEqual(mockData[1].start.dateTime);
  });

  test('event end date time renders correctly', () => {
    expect(EventWrapper.find('.event-end-date-time').text()).toEqual(mockData[1].end.dateTime);
  });

  test('event organizer renders correctly', () => {
    expect(EventWrapper.find('.event-organizer').text()).toEqual(mockData[1].organizer.displayName);
  });

  test('event location renders correctly when expanded', () => {
    EventWrapper.setState({ show: true });
    expect(EventWrapper.find('.event-location').text()).toEqual(mockData[1].location);
  });

  test('event description renders correctly when expanded', () => {
    EventWrapper.setState({ show: true });
    expect(EventWrapper.find('.event-description').text()).toEqual(mockData[1].description);
  });

  test('event link renders correctly when expanded', () => {
    EventWrapper.setState({ show: true });
    expect(EventWrapper.find('.event-link').text()).toEqual(mockData[1].htmlLink);
  });
  


});