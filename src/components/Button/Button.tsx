import React, { useEffect, useState } from "react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  const { label, onClick } = props;

  const [position, setPosition] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (position.x !== -1 && position.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 250);
    } else setIsRippling(false);
  }, [position]);

  useEffect(() => {
    if (!isRippling) setPosition({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className="sc-button"
      onClick={(e) => {
        const buttonContainer = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: e.clientX - buttonContainer.left,
          y: e.clientY - buttonContainer.top,
        });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="sc-ripple"
          style={{
            left: position.x,
            top: position.y,
          }}
        />
      ) : (
        ""
      )}
      <label className="sc-button-label">{label}</label>
    </button>
  );
};

export default Button;
