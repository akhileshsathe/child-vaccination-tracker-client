import React from "react";
import logo from "../logo.svg";
const PageAside = ({
  name,
  type,
  value,
  handleChange,
  labeltext,
  placeholder,
  labelClassName,
  inputClassName,
  oneLine,
  iconClass,
  inputIcon
}) => {
  return (
    <div className="pageaside bAccent">
    <img src={logo} className="logo-aside" alt="Child Vaccination Tracker" />
  </div>
  );
};
export default PageAside;

