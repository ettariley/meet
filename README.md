Meet
A progressive wep app for you to look up events by city!

Scenarios/User Stories:
Feature 2: As a user, I should be able to see a list of events and expand the details of an event, so that I can view both sets of event information.
1. Given the user has not expanded an event for details, when the user is viewing the event list, then the user should see a list of events with the option to expand individual events for details.
2. Given the user is viewing the event list, when the user selects an event to see details, then the user should see the details for that specific event.
3. Given the user has expanded an event for details, when the user is finished viewing the details, then the user should be able to collapse (close) the event details.

Feature 3: As a user, I should be able to specify the number of events on the page, so that I can view more or fewer events than the default if desired.
1. Given the user hasn't specified the number of events to display on the page, when the user is viewing the main page, then the user should see no more than 32 events on the page.
2. Given the user is viewing the main page, when the user changes the number of events to display, then the user should see no more than that number of events on the page.

Feature 4: As a user, I should be able to use the app offline, so I can see the events and information I had loaded in the app the last time I used it online.
1. Given the user's device goes offline, when the user continues to use the app, then the user should see cached data.
2. Given the user's device is offline, when the user tries to change settings that require an online connection (i.e. changing city or date range), then the user should see an error message informing them of the offline status.

Feature 5: As a user, I should be able to view a chart of events across multiple cities, so that I can see where events are occurring by city compared to other cities. 
1. Given the user wants to view events across mutliple cities, the user can select a chart view, then the user should see a chart of the number of upcoming events in the cities they select.