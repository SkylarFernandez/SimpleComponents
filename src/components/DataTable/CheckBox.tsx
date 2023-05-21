import React, { ChangeEventHandler } from "react";

const CheckBox = (props: any) => {
  const { idx, selectRow, selectAllRows, tableData, isHeader, className } =
    props;
  const currentTableRow = tableData?.[idx];

  const handleChange = (e: { target: { checked: any } }) => {
    selectRow ? selectRow(idx) : selectAllRows(e.target.checked);
  };
  return (
    <input
      checked={isHeader ? props.checked : currentTableRow?.isChecked}
      className={className ?? "sc-datatable-selector"}
      onChange={handleChange}
      type="checkbox"
    />
  );
};
export default CheckBox;
