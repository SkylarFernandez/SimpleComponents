import React, { useState } from "react";
import "./InputText.scss";

export interface InputTextProps {
  label?: string;
  text?: string;
  colon?: boolean;
  onChange?: Function;
}

const InputText = (props: InputTextProps) => {
  const { label, text = "", colon = true, onChange: propsOnChange } = props;

  const [textValue, setTextValue] = useState(text);

  const handleOnChange = (e: any) => {
    setTextValue(e.value);
    propsOnChange && propsOnChange(e);
  };

  return (
    <div className="sc-inputtext">
      <label className="sc-inputtext-label">
        {label && colon ? `${label}:` : label ? `${label}` : ""}
      </label>
      <input
        type="text"
        className="sc-inputtext-input"
        value={textValue}
        onChange={handleOnChange}
      ></input>
    </div>
  );
};

export default InputText;
