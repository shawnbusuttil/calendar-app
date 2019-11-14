import React, { FC } from "react";

import Calendar from "./containers/calendar/Calendar";
import Reminders from "./containers/reminders/Reminders";

import "./App.scss";

const App: FC = () => (
    <div className="app">
        <div className="main">
            <Calendar />
        </div>
        <div className="side">
            <Reminders />
        </div>
    </div>
);

export default App;

