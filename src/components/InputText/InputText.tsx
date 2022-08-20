import React, { useState } from "react";
import "./InputText.scss";

export interface InputTextProps {
  label?: string;
  text?: string;
  colon?: boolean;
}

const InputText = (props: InputTextProps) => {
  const { label, text = "", colon = true } = props;

  const [textValue, setTextValue] = useState(text);

  const handleOnChange = (e: any) => {
    setTextValue(e.value);
  };

  return (
    <div className="sc-inputtext">
      <text className="sc-inputtext-label">
        {label && colon ? `${label}:` : label ? `${label}` : ""}
      </text>
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
