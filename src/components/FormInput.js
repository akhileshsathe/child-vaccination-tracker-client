import React from "react";

const FormInput = ({
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
  inputIcon,
  disable=false
}) => {
  return (<div className="flex-item">
    <label className={"secondary" || "secondary "+labelClassName}  htmlFor={name}>
      {labeltext || name}
      <div className="iconInputContainer">
      <span className="material-symbols-outlined formicon">{inputIcon}</span>
      <input
        className={"Form-input name" || "Form-input name "+inputClassName}
        type={type}
          
        defaultValue={value}
        name={name}
        placeholder={placeholder || name}
        onChange={handleChange}
        disabled={disable}

        // onKeyDown={(e)=>{if(e.target.value.length>6)e.preventDefault}}
      />
      </div>

    </label>
    </div>
  );
};
export default FormInput;

