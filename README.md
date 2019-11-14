This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Decision Making

There are two main smart containers in this app. One handles the calendar and the other handles the reminders. Both communicate with the store. 

For brevity, the store uses one state partition. In production, calendar state may be separated from reminders state.

The reducer has three CRUD operations aside from setting the date. Adding, editing and deleting. Editing is the trickiest part of the business logic as handling a reminder update in the same day is different from changing the date (day or month).

The data store for the calendar was structured as being an object (hash table) for the month, which contains another object for the days as keys, each holding an array of reminders. This is because I want to access a collection of reminders in constant time. And if this application was extended to support filtering or searching by day, we'd have a guarateed lookup of O(1). If I had used an array to hold the days, we'd have a O(n) just to locate a day in the data structure unless we assume the index directly maps to the day.

Another tricky bit was aligning day formats below 10 e.g. "01" vs. "1", which I worked around using functions in the utils file.

## Possible Improvements

In production, moment.js could possibly make the process a little easier. Also, previous months would be blocked and include support for future years.

Possible improvements include increased type coverage and media queries to make the site mobile first. Server-side could also write and read the reminders to/from file. On mobile, a hamburger menu could be used to show the reminders as there is no way both of those components would fit nicely on screen. Finally, a reminder could also be checked against local time and remove itself from state as well as display as a snackbar or modal if it is in the past.

Better style encapsulation with css modules or styled components.

For testing, the react testing library was used to enforce black-box testing and holds an advantage over enzyme when testing hooks, which can have issues.

## Available Scripts

In the project directory, you can run:

### `yarn start:server`

Runs the app in the production mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn start:client`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn server`

Runs the mock server. This is by no means a production server.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
