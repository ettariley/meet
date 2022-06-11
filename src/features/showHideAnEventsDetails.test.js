import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';
import { mockData } from "../mock-data";
import Event from '../Event';
import EventList from '../EventList';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let EventWrapper;
    let EventListWrapper;

    beforeAll(() => {
        EventListWrapper = shallow(<EventList events={mockData} />);
        EventWrapper = shallow(<Event event={mockData[1]} />);
    })

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('the user has not expanded an event for details', () => {
            EventWrapper.setState({ show: false });
        });

        when('the user is viewing the event list', () => {
            expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
        });

        then('the user should see a list of events with the option to expand individual events for details.', () => {
            expect(EventWrapper.find(".show-hide-details")).toHaveLength(1);
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        given('the user is viewing the event list', () => {});

        when('the user selects an event to see details', () => {
            EventWrapper.find('.show-hide-details').simulate('click');
        });

        then('the user should see the details for that specific event.', () => {
            expect(EventWrapper.find(".event-expanded")).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        given('the user has expanded an event for details', () => {
            EventWrapper.setState({ show: true });
        });

        when('the user is finished viewing the details', () => {
            EventWrapper.find('.show-hide-details').simulate('click');
        });

        then('the user should be able to collapse the event details.', () => {
            expect(EventWrapper.find(".event-expanded")).toHaveLength(0);
        });
    });
});