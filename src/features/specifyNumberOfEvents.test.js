import { loadFeature, defineFeature } from 'jest-cucumber';
import React from "react";
import { mount, shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";
import App from '../App';
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents eventCount={32} updateEvents={() => {}} />);
  });

  test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
      given('the user hasn\'t specified the number of events to display on the page', () => {});
      
      when('the user is viewing the main page', () => {});

      then(/^the user should see no more than 32 events on the page$/, () => {
        const eventCount = NumberOfEventsWrapper.state('eventCount');
        expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(eventCount);
      });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {
      let AppWrapper;
      given('the user is viewing the main page', () => {
        AppWrapper = mount(<App />);
      });

      when('the user changes the number of events to display', () => {
        NumberOfEventsWrapper.find('.number').simulate("change", {
          target: { value: "1" },
        });
        AppWrapper.update();
      });

      then('the user should see no more than that number of events on the page', () => {
        expect(NumberOfEventsWrapper.state('eventCount')).toEqual(1);
      });
  });
});