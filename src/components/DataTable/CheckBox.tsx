import React, { ChangeEventHandler } from "react";

const CheckBox = (props: any) => {
  const { idx, selectRow } = props;

  const handleChange = (e: { target: { checked: any } }) => {
    if (e?.target.checked) {
      selectRow(idx);
    } else {
      selectRow(idx, true); // tell the method to remove this element
    }
  };

  return (
    <input
      className="sc-datatable-selector"
      onChange={handleChange}
      type="checkbox"
    />
  );
};
export default CheckBox;
