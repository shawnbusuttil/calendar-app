import React from "react";
import { RenderResult, render, fireEvent } from "@testing-library/react";

import ReminderForm from "./ReminderForm";

describe("ReminderForm", () => {
    const onSubmitMock = jest.fn();
    let wrapper: RenderResult;

    const reminder = {
        id: 1,
        title: "Test Title",
        date: { month: "1", day: "1" },
        time: "16:00",
        text: "Some text."
    };

    beforeEach(() => {
        wrapper = render(<ReminderForm reminder={reminder}
            submit={onSubmitMock} />
        );
    });

    describe("when a value is changed in one of the inputs", () => {
        it("reflects in the input value", () => {
            const mockEvent = {
                target: { value: "2019-02-01" }
            };

            const input = wrapper.baseElement.querySelector("input[name='date']") as HTMLInputElement;
            fireEvent.change(input, mockEvent);

            expect(input.value).toEqual("2019-02-01");
        });
    });

    describe("when the form is submitted", () => {
        it("should attempt to submit a reminder", () => {
            const controls = [
                { selector: "input[name='title']", val: "The reminder." },
                { selector: "input[name='date']", val: "2019-01-01" },
                { selector: "input[name='time']", val: "17:00" },
                { selector: "textarea[name='text']", val: "Some text." }
            ];

            controls.forEach(c => {
                const input = wrapper.baseElement.querySelector(c.selector) as HTMLInputElement;
                fireEvent.change(input, { target: { value: c.val } });
            });

            const form = wrapper.getByTestId("form");
            fireEvent.submit(form);

            expect(onSubmitMock).toHaveBeenCalledWith({
                id: 1,
                title: "The reminder.",
                date: {
                    month: "1",
                    day: "1"
                },
                time: "17:00",
                text: "Some text."
            });
        });
    });
});