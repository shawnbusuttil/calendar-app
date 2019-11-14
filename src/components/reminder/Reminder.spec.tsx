import React from "react";
import { RenderResult, render, fireEvent } from "@testing-library/react";

import Reminder from "./Reminder";

describe("Reminder", () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();

    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<Reminder title={"Test Title"} time="16:00" text={"Lorem ipsum."}
            edit={onEditMock} delete={onDeleteMock} />);
    });

    it("renders the reminder with the correct props", () => {
        expect(wrapper.getByTestId("title").textContent).toEqual("Test Title");
        expect(wrapper.getByTestId("time").textContent).toEqual("16:00");
        expect(wrapper.getByTestId("text").textContent).toEqual("Lorem ipsum.");
    });

    it("calls the edit handler when clicked", () => {
        const button = wrapper.getByTestId("edit") as HTMLButtonElement;
        fireEvent.click(button);
        expect(onEditMock).toHaveBeenCalled();
    });

    it("calls the delete handler when clicked", () => {
        const button = wrapper.getByTestId("delete") as HTMLButtonElement;
        fireEvent.click(button);
        expect(onDeleteMock).toHaveBeenCalled();
    });
});