/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Task2 from "../app/Task2";

function setup(jsx) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    }
}

it("task2 bahaves correctly", async () => {
    const { user } = setup(<Task2 />);  
    
    let container = screen.getByRole('list')
    let elements = screen.getAllByRole('listitem')
    let textBlock = screen.getByTestId("text");

    expect(container.textContent).toBe("id - 1id - 2id - 3");
    expect(textBlock.textContent).toBe("");

    await user.hover(elements[1]);
    expect(textBlock.textContent).toBe("hidden text 2");

    await user.hover(elements[2]);
    expect(textBlock.textContent).toBe("hidden text 3");

    await user.unhover(elements[2]);
    expect(textBlock.textContent).toBe("");
});
