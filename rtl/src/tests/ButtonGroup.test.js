// src/tests/ButtonGroup.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGroup from "../components/ButtonGroup";
import "@testing-library/jest-dom/extend-expect";

test("aligns text according to selected button", () => {
  render(<ButtonGroup />);

  // Check initial alignment
  expect(screen.getByTestId("text")).toHaveAttribute("align", "left");

  // Change alignment to center
  fireEvent.click(screen.getByLabelText(/center/i));
  expect(screen.getByTestId("text")).toHaveAttribute("align", "center");

  // Change alignment to right
  fireEvent.click(screen.getByLabelText(/right/i));
  expect(screen.getByTestId("text")).toHaveAttribute("align", "right");
});
