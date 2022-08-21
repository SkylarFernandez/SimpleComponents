import React, { useEffect, useState } from "react";
import data from "./TestTableData.json";
import CheckBox from "./CheckBox";
import "./DataTable.scss";

type Columns = {
  label: string;
  id: string;
};

export interface DataTableProps {
  data?: Array<Object>;
  activeColumns?: Array<Columns>;
}

const DataTable = (props: DataTableProps) => {
  const {
    activeColumns = [
      { label: "Name", id: "fullName" },
      { label: "Address", id: "address" },
      { label: "Phone Number", id: "phoneNumber" },
      { label: "Email", id: "email" },
    ],
  } = props;
  const [tableData, setTableData] = useState(data);
  const [activeTableColumns, setColumns] = useState(activeColumns);
  const [selectedRows, setSelectedRows] = useState<Array<Object>>([]); // need to allow optional parent props drilling so we can access these in datatable parent

  function isObject(object: Object) {
    return object != null && typeof object === "object";
  }

  // courtesy of https://medium.com/geekculture/object-equality-in-javascript-2571f609386e
  function isEqual(obj1: Object, obj2: Object) {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length != props2.length) {
      return false;
    }
    for (var i = 0; i < props1.length; i++) {
      let val1 = obj1[props1[i] as keyof typeof obj1];
      let val2 = obj2[props1[i] as keyof typeof obj2];
      let isObjects = isObject(val1) && isObject(val2);
      if (
        (isObjects && !isEqual(val1, val2)) ||
        (!isObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  }

  const selectRow = (idx: number, remove?: boolean) => {
    if (remove) {
      const rowToRemove = tableData[idx];
      if (rowToRemove !== undefined) {
        let newRows = selectedRows;
        selectedRows.map((element, index) => {
          if (isEqual(rowToRemove, element)) {
            newRows.splice(index, 1);
          }
        });
        setSelectedRows(newRows);
      }
    } else {
      const newRow = tableData[idx];
      if (newRow !== undefined) {
        const newSelection: Array<Object> = selectedRows;
        newSelection.push(newRow);
        setSelectedRows(newSelection);
      }
    }
  };

  const renderHeader = () => {
    let rowElements: JSX.Element[] = [];
    rowElements[0] = (
      <th className="sc-datatable-selector-container">
        <CheckBox />
      </th>
    );
    activeTableColumns.forEach((e: Columns, index) => {
      if (typeof e.label === "string") {
        rowElements[index + 1] = <th>{e.label}</th>;
      }
    });
    return rowElements;
  };

  const renderTableRows = (rowData: Object, idx: number) => {
    let tableRow: JSX.Element[] = [];
    tableRow[0] = (
      <td className="sc-datatable-selector-container">
        <CheckBox idx={idx} selectRow={selectRow} />
      </td>
    );
    Object.entries(rowData).forEach(([key, value]) => {
      if (value && typeof value === "string") {
        activeColumns.forEach((element, index) => {
          if (element.id === key) {
            tableRow[index + 1] = <td>{value}</td>;
          }
        });
      }
    });

    return tableRow;
  };

  return (
    <div className="sc-datatable-container">
      <table className="sc-table">
        <thead className="sc-tablehead">
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody className="sc-tablebody">
          {tableData.map((tableData, index) => (
            <tr>{renderTableRows(tableData, index)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
