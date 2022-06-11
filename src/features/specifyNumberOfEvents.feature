Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given the user hasn't specified the number of events to display on the page
When the user is viewing the main page
Then the user should see no more than 32 events on the page

Scenario: User can change the number of events they want to see.
Given the user is viewing the main page
When the user changes the number of events to display
Then the user should see no more than that number of events on the page