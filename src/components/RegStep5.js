import React from "react";
import FormInput from "./FormInput";

const RegStep5 = ({ handleChange, values }) => {
  return (
    <>
      <h2 className="st">Email</h2>
      <FormInput
        type="text"
        name="Email"
        labeltext="Email:"
        inputIcon="mail"
        placeholder="Enter your email"
        handleChange={handleChange}
        value={values.Email}
      />

      <FormInput
        type="text"
        name="cEmail"
        labeltext=" Confirm Email:"
        inputIcon="mail"
        placeholder="Enter your email again"
        handleChange={handleChange}
        value={values.cEmail}
      />
    </>
  );
};
export default RegStep5;
