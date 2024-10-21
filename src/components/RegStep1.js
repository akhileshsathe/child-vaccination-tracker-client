import React from "react";
import FormInput from "./FormInput";

const RegStep1 = ({ values, handleChange }) => {
  return (
    <>
      <h2 className="st">Parent's Details</h2>
      <FormInput
        type="text"
        name="parentName"
        placeholder="Parent's Name"
        labeltext="Full Name:"
        inputIcon="escalator_warning"
        handleChange={handleChange}
        value={values.parentName}
      />

      <FormInput
        type="number"
        name="parentPhone"
        labeltext="Phone:"
        inputIcon="call"
        placeholder="Parent's Contact Number"
        handleChange={handleChange}
        value={values.parentPhone}
      />

      <FormInput
        type="date"
        labeltext="Parent's Date of Birth:"
        name="parentDOB"
        placeholder="Date"
        handleChange={handleChange}
        value={values.parentDOB}
      />
    </>
  );
};
export default RegStep1;
