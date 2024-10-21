import React from "react";
import FormInput from "./FormInput";

const RegStep4 = ({ handleChange, values }) => {
  return (
    <>
      <h2 className="st">Password Creation</h2>
      <FormInput
        labeltext="Password"
        type="password"
        name="password"
        inputIcon="lock"
        value={values.password}
        handleChange={handleChange}
        placeholder="Set a Password"
      />

      <FormInput
        labeltext="Confirm Password"
        type="password"
        name="cpassword"
        inputIcon="lock"
        value={values.cpassword}
        handleChange={handleChange}
        placeholder="Enter the password again"
      />

        <div className="centered">
        <span className="material-symbols-outlined rmargin-10">
info
</span>
{'   '}Set a Strong Password.
</div>
<ul>
  <li>Minimum 8 characters</li>
  <li>Minimum 1 uppercase letter</li>
  <li>Minimum 1 lowercase letter</li>
  <li>Minimum 1 special character</li>

  


</ul>
    </>
  );
};
export default RegStep4;
