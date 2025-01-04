import React from "react";
import "./buttonComponentStyle.css"
const Button = ({
  onClick,
  className,
  child,
  type = "button",
  disabled = false,
  logo,
}) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {logo}
      {child}
    </button>
  );
};

export default Button;
