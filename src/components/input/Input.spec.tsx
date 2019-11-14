import React from "react";
import { render, fireEvent, RenderResult } from '@testing-library/react';

import InputField from "./Input";

describe("InputField", () => {
    const onChangeMock = jest.fn();
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<InputField title="Test Input Title" 
            name="Test Input Name"
            type="text"
            value="Test Input Value"
            placeholder="Test Input Placeholder"
            handleChange={onChangeMock}
        />);
    });

    it("renders the component with the correct props", () => {
        expect(wrapper.getByTestId("input-label").textContent).toEqual("Test Input Title");
        const input = wrapper.getByPlaceholderText("Test Input Placeholder") as HTMLInputElement;
        expect(input.value).toEqual("Test Input Value");
    });

    it("calls the handler when clicked", () => {
        const mockEvent = {
            target: { value: "Hello" }
        };

        const input = wrapper.getByPlaceholderText("Test Input Placeholder") as HTMLInputElement;
        fireEvent.change(input, mockEvent);
        expect(onChangeMock).toHaveBeenCalled();
    });
});