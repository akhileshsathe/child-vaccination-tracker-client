import React from "react";
import FormInput from "./FormInput";

const ARegStep1 = ({ values, handleChange }) => {
  return (
    <>
      <h2 className="st">Parent's Details</h2>
      <FormInput
        type="text"
        name="adminName"
        placeholder="Admin Name"
        labeltext="Admin Name:"
        inputIcon="escalator_warning"
        handleChange={handleChange}
        value={values.adminName}
      />
      <FormInput
        type="text"
        name="Email"
        placeholder="Email"
        labeltext="Email:"
        inputIcon="escalator_warning"
        handleChange={handleChange}
        value={values.Email}
      />
      <FormInput
        type="number"
        name="adminPhone"
        labeltext="Phone:"
        inputIcon="call"
        placeholder="Contact Number"
        handleChange={handleChange}
        value={values.adminPhone}
      />
      <div className="flex-item">
          <label className="secondary">
              Gender:
          </label>
              <br />
      <div className="radio-container">
        <input id="toggle-on" className="toggle invisible-radio toggle-left"
        name="adminGender"
        onChange={handleChange}
        value="male"
        type="radio" defaultChecked/>
      <label htmlFor="toggle-on" className="tbtn">Male</label>
      <input id="toggle-off"
        className="toggle invisible-radio toggle-right"
        name="adminGender"
        onChange={handleChange}
        value="female"
        type="radio"/>
      <label htmlFor="toggle-off" className="tbtn">Female</label>
      </div>
    </div>

      <br/>
      <FormInput
        type="date"
        labeltext="Admin's Date of Birth:"
        name="adminDOB"
        placeholder="Admin's Date of Birth"
        handleChange={handleChange}
        value={values.adminDOB}
      />
    </>
  );
};
export default ARegStep1;
