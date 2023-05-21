import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

describe("Button", () => {
  test("renders the Button component", () => {
    const { getByText } = render(<Button label="Hello world!" />);
    expect(getByText("Hello world!")).toBeInTheDocument();
  });

  test("Check onClick", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button label="Hello world!" onClick={onClick} />
    );
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
