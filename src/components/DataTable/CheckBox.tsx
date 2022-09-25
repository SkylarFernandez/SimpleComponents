import React, { ChangeEventHandler } from "react";

const CheckBox = (props: any) => {
  const { idx, selectRow, selectAllRows, globalChecked } = props;

  const handleChange = (e: { target: { checked: any } }) => {
    if (globalChecked !== "checkAll") {
      if (e?.target.checked) {
        selectRow ? selectRow(idx) : selectAllRows(true);
      } else {
        selectRow ? selectRow(idx, true) : selectAllRows(false); // tell the method to remove this element
      }
    }
  };
  return (
    <input
      checked={globalChecked === "checkAll" ? true : props.checked}
      className="sc-datatable-selector"
      onChange={handleChange}
      type="checkbox"
    />
  );
};
export default CheckBox;
