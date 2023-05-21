import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import InputText from "./InputText";

describe("InputText", () => {
  test("renders the InputText component", () => {
    const { getByText } = render(<InputText label="InputText" />);
    expect(getByText("InputText:")).toBeInTheDocument();
  });

  test("test colon false", () => {
    const { getByText } = render(<InputText label="InputText" colon={false} />);
    expect(getByText("InputText")).toBeInTheDocument();
  });

  test("test default text", () => {
    const { getByDisplayValue } = render(
      <InputText label="InputText" text={"test text"} />
    );
    expect(getByDisplayValue("test text")).toBeInTheDocument();
  });

  test("test onChange", () => {
    const onChange = jest.fn();

    const { getByDisplayValue } = render(
      <InputText label="InputText" text={"test text"} onChange={onChange} />
    );
    const inputText = getByDisplayValue("test text");
    fireEvent.change(inputText, { target: { value: "23" } });
    expect(getByDisplayValue("23")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalled();
  });
});
