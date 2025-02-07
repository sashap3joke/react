// src/tests/App.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";
import "@testing-library/jest-dom/extend-expect";

test("displays ImageCard when Picture tab is selected", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Picture/i));
  expect(screen.getByRole("img")).toBeInTheDocument(); // Assuming ImageCard has an image element
});

test("displays Calculations component when Calculations tab is selected", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Calculations/i));
  expect(screen.getByText(/Result/i)).toBeInTheDocument(); // Checks if Calculations component is displayed
});

test("displays ButtonGroup component when Group tab is selected", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Group/i));
  expect(screen.getByTestId("button-group")).toBeInTheDocument(); // Checks if ButtonGroup is displayed
});

test("does not display components when tabs are not active", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Calculations/i));
  expect(screen.queryByRole("img")).not.toBeInTheDocument(); // ImageCard should not be visible
  expect(screen.queryByTestId("button-group")).not.toBeInTheDocument(); // ButtonGroup should not be visible

  fireEvent.click(screen.getByText(/Group/i));
  expect(screen.queryByText(/Result/i)).not.toBeInTheDocument(); // Calculations should not be visible
  expect(screen.queryByRole("img")).not.toBeInTheDocument(); // ImageCard should not be visible
});
