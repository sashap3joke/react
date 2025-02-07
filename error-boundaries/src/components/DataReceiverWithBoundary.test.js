import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataReceiverWithBoundary from "./DataReceiverWithBoundary";
import * as dataContext from "../api";

describe("DataReceiverWithBoundary", () => {
  it("renders ErrorFallback when getData() throws an exception", async () => {
    const mySpy = jest.spyOn(dataContext, "getData").mockImplementation(() => {
      throw Error("error");
    });
    render(<DataReceiverWithBoundary />);

    const button = screen.getByText("Get new data");
    userEvent.click(button);

    const tryAgainButton = screen.getByText("Try again");
    mySpy.mockClear();

    expect(tryAgainButton).toBeInTheDocument();
  });
});
