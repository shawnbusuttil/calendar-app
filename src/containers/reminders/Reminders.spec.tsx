import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { RenderResult, render, fireEvent, waitForElement } from "@testing-library/react";

import Reminders from "./Reminders";
import reducer, { initialState } from "../../store/reducer";

describe("Reminders", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<Provider store={createStore(reducer, { 
            currentMonth: 11, 
            currentDay: 1, 
            reminders: {
                [11]: {
                    [1]: [{
                        id: 1,
                        title: "The reminder.",
                        date: {
                            month: "11",
                            day: "1"
                        },
                        time: "17:00",
                        text: "Some text."
                    }]
                }
            }
        })}>
            <Reminders />
        </Provider>);
    });

    it("should display appropriate amount of reminders for the date", () => {
        const reminders = wrapper.getAllByTestId("reminder");
        expect(reminders.length).toEqual(1);
    });

    describe("when new reminder is clicked", () => {
        beforeEach(() => {
            const button = wrapper.getByText("New") as HTMLButtonElement;
            fireEvent.click(button);
        });

        it("should display a modal", () => {
            const modal = wrapper.getByTestId("modal");
            expect(modal).toBeTruthy();
        });
    });

    describe("when a reminder is updated", () => {
        beforeEach(() => {
            const button = wrapper.getByText("Edit") as HTMLButtonElement;
            fireEvent.click(button);
        });

        it("should display a modal", () => {
            const modal = wrapper.getByTestId("modal");
            expect(modal).toBeTruthy();
        });
    });

    describe("when a reminder is deleted", () => {
        beforeEach(() => {
            const button = wrapper.getByText("Remove") as HTMLButtonElement;
            fireEvent.click(button);
        });

        it("should delete the reminder", () => {
            const reminders = wrapper.queryAllByTestId("reminder");
            expect(reminders.length).toBe(0);
        });
    });
});