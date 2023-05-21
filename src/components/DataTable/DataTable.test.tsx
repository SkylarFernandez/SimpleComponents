import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import data from "./TestTableData.json";

import DataTable from "./DataTable";

const activeColumns = [
  { label: "Name", id: "fullName" },
  { label: "Address", id: "address" },
  { label: "Phone Number", id: "phoneNumber" },
  { label: "Email", id: "email" },
];

describe("DataTable", () => {
  test("renders the DataTable component with test data", () => {
    const { getByText } = render(
      <DataTable activeColumns={activeColumns} data={data} />
    );
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Jessica warren")).toBeInTheDocument();
  });

  test("select all rows", () => {
    const setSelectedRows = jest.fn();

    const { container } = render(
      <DataTable
        activeColumns={activeColumns}
        data={data}
        getSelectedRows={setSelectedRows}
      />
    );
    const selectAll = container.getElementsByClassName("selectAllCheckbox")[0];
    fireEvent.click(selectAll);
    expect(setSelectedRows).toHaveBeenCalled();
  });
});
