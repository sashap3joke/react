import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataReceiver from "./DataReceiver";
import * as dataContext from "../api";

describe("DataReceiver", () => {
  it("renders 'Get new data' button", async () => {
    render(<DataReceiver />);

    const button = screen.getByText("Get new data");

    expect(button).toBeInTheDocument();
  });

  it("renders without errors with new data", async () => {
    const mySpy = jest
      .spyOn(dataContext, "getData")
      .mockImplementation(() => 11);
    render(<DataReceiver />);

    const button = screen.getByText("Get new data");
    userEvent.click(button);
    const result = screen.getByText("11");
    mySpy.mockClear();

    expect(result).toBeInTheDocument();
  });
});
