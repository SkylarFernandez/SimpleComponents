import React, { useEffect, useState, useCallback } from "react";
import CheckBox from "./CheckBox";
import "./DataTable.scss";

type Columns = {
  label: string;
  id: string;
};

export interface RowData {
  [key: string]: unknown;
}
export interface DataTableProps {
  data?: Array<RowData>;
  activeColumns?: Array<Columns>;
  getSelectedRows?: Function;
}

const DataTable = (props: DataTableProps) => {
  const { activeColumns, data, getSelectedRows: propsGetSelectedRows } = props;
  const [tableData, setTableData] = useState<Array<RowData>>(data || []);
  const [activeTableColumns, setColumns] = useState(activeColumns || []);
  useEffect(() => {
    if (data) {
      const newTableData = JSON.parse(JSON.stringify(data));
      newTableData.forEach((e: RowData) => {
        e.isChecked = false;
      });
      setTableData(newTableData);
    }
    if (activeColumns) {
      setColumns(activeColumns);
    }
  }, [data, activeColumns]);

  const selectAllRows = (selectAll?: boolean) => {
    const copyData: Array<RowData> = JSON.parse(JSON.stringify(tableData));
    copyData.forEach((e) => {
      e.isChecked = selectAll;
    });
    setTableData(copyData);
    propsGetSelectedRows && propsGetSelectedRows(selectAll ? copyData : []);
  };

  const selectRow = (idx: number) => {
    const copyData: Array<RowData> = JSON.parse(JSON.stringify(tableData));
    if (copyData[idx]) {
      copyData[idx].isChecked = !copyData[idx].isChecked;
      let newRows: Array<RowData> = [];
      copyData.forEach((e) => {
        if (e.isChecked) newRows.push(e);
      });
      setTableData(copyData);
      propsGetSelectedRows && propsGetSelectedRows(newRows);
    }
  };

  const colSortAsc = (colId: string) => {
    const dataCopy = [...tableData];
    const checkCellDataType = typeof dataCopy?.[0]?.[colId];
    if (checkCellDataType === "number") {
      try {
        // if its a number use a-b sorting
        dataCopy.sort((a, b) => (a[colId] as number) - (b[colId] as number));
      } catch (e) {
        console.error("Could not sort column as numbers", e);
      }
    } else {
      try {
        dataCopy.sort((a, b) => {
          // ignore case
          const aLower = (a[colId] as string)?.toUpperCase();
          const bLower = (b[colId] as string)?.toUpperCase();

          return aLower.localeCompare(bLower);
        }); // if its a string use default sort
      } catch (e) {
        console.error("Could not sort column as strings", e);
      }
    }
    setTableData(dataCopy);
    propsGetSelectedRows && propsGetSelectedRows([]);
  };

  const colSortDes = (colId: string) => {
    const dataCopy = [...tableData];
    const checkCellDataType = typeof dataCopy?.[0]?.[colId];
    if (checkCellDataType === "number") {
      try {
        // if its a number use a-b sorting
        dataCopy.sort((a, b) => (b[colId] as number) - (a[colId] as number));
      } catch (e) {
        console.error("Could not sort column as numbers", e);
      }
    } else {
      try {
        dataCopy.sort((a, b) => {
          // ignore case
          const aLower = (a[colId] as string)?.toUpperCase();
          const bLower = (b[colId] as string)?.toUpperCase();

          return bLower.localeCompare(aLower);
        }); // if its a string use default sort
      } catch (e) {
        console.error("Could not sort column as strings", e);
      }
    }
    setTableData(dataCopy);
    propsGetSelectedRows && propsGetSelectedRows([]);
  };

  const renderHeader = () => {
    let rowElements: JSX.Element[] = [];
    rowElements[0] = (
      <th className="sc-datatable-selector-container">
        <CheckBox
          className="selectAllCheckbox"
          selectAllRows={selectAllRows}
          tableData={tableData}
          isHeader
        />
      </th>
    );
    activeTableColumns.forEach((e: Columns, index) => {
      if (typeof e.label === "string") {
        rowElements[index + 1] = (
          <th>
            <div className="sc-datatable-header-contents">
              {e.label}
              <div className="sc-datatable-sort-buttons">
                <button onClick={() => colSortAsc(e.id)}>▲</button>
                <button onClick={() => colSortDes(e.id)}>▼</button>
              </div>
            </div>
          </th>
        );
      }
    });
    return rowElements;
  };

  const renderTableRows = useCallback(
    (rowData: any, idx: number) => {
      let tableRow: JSX.Element[] = [];
      tableRow[0] = (
        <td className="sc-datatable-selector-container">
          <CheckBox idx={idx} selectRow={selectRow} tableData={tableData} />
        </td>
      );
      Object.entries(rowData).forEach(([key, value]) => {
        if (value && typeof value === "string") {
          activeTableColumns.forEach((element, index) => {
            if (element.id === key) {
              tableRow[index + 1] = <td>{value}</td>;
            }
          });
        }
      });

      return tableRow;
    },
    [activeTableColumns, tableData]
  );
  return (
    <div className="sc-datatable-container">
      <table className="sc-table">
        <thead className="sc-tablehead">
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody className="sc-tablebody">
          {tableData.map((tableRow, index) => (
            <tr>{renderTableRows(tableRow, index)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
