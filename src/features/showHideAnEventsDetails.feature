Feature: Show and hide an events' details

Scenario: An event element is collapsed by default.
Given the user has not expanded an event for details
When the user is viewing the event list
Then the user should see a list of events with the option to expand individual events for details.

Scenario: User can expand an event to see its details.
Given the user is viewing the event list
When the user selects an event to see details
Then the user should see the details for that specific event.

Scenario: User can collapse an event to hide its details.
Given the user has expanded an event for details
When the user is finished viewing the details
Then the user should be able to collapse the event details.