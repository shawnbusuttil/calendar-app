import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { RenderResult, fireEvent, render } from "@testing-library/react";

import Calendar from "./Calendar";

import { MONTHS, DATE } from "../../date.const";
import { daysInMonth } from "../../date.utils";

import reducer, { initialState } from "../../store/reducer";

describe("Calendar", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<Provider store={createStore(reducer, initialState)}>
            <Calendar />
        </Provider>);
    });

    it("should render the correct current month", () => {
        const month = wrapper.getByTestId("current-month");
        expect(month.textContent).toEqual(MONTHS[DATE.getMonth() + 1]);
    });

    it("should render the correct calendar dates", () => {
        const dates = wrapper.getAllByTestId("calendar-date");
        expect(dates.length).toEqual(daysInMonth(DATE.getMonth() + 1, DATE.getFullYear()));
    });

    describe("when the prev month is clicked", () => {
        it("should render the correct prev month", () => {
            const button = wrapper.getByTestId("prev-month") as HTMLButtonElement;
            fireEvent.click(button);

            const month = wrapper.getByTestId("current-month");
            expect(month.textContent).toEqual(MONTHS[DATE.getMonth() + 1 - 1]);
        });
    });

    describe("when the next month is clicked", () => {
        it("should render the correct next month", () => {
            const button = wrapper.getByTestId("next-month") as HTMLButtonElement;
            fireEvent.click(button);

            const month = wrapper.getByTestId("current-month");
            expect(month.textContent).toEqual(MONTHS[DATE.getMonth() + 1 + 1]);
        });
    });
});