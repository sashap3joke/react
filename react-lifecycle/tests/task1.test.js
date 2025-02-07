/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";

import Task1 from "./../app/Task1";

beforeEach(() => {
  const fakeData = [{ id: 1, name: "aaa", note: "123" }];

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );
});

afterEach(() => {
  global.fetch.mockRestore();
});

it("task1", async () => {
  render(<Task1 />);
  const loadingElement = screen.getByText("Loading...");
  expect(loadingElement).toBeInTheDocument();

  const list = await screen.findByText("id - 1name - aaanote - 123");
  expect(list).toBeInTheDocument();
});
