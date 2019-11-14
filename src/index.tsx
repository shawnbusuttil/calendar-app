import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";

import appReducer from "./store/reducer";
import App from "./App";

import "./index.scss";

const appState = createStore(appReducer);

ReactDOM.render(
    <Provider store={appState}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);