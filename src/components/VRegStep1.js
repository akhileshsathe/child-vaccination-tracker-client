import React from "react";
import FormInput from "./FormInput";

const VRegStep1 = ({ values, handleChange }) => {
  return (
    <>
      <h2 className="st">Vaccination Center's Details</h2>
      <FormInput
        type="text"
        name="vcName"
        placeholder="Vaccination Center's Name"
        labeltext="Vaccination Center's Name:"
        inputIcon="escalator_warning"
        handleChange={handleChange}
        value={values.vcName}
      />
      <FormInput
        type="text"
        name="vcOwnerName"
        placeholder="Owner's Name"
        labeltext="Owner's Name:"
        inputIcon="escalator_warning"
        handleChange={handleChange}
        value={values.vcOwnerName}
      />
      <FormInput
        type="number"
        name="vcPhone"
        labeltext="Phone:"
        inputIcon="call"
        placeholder="Contact Number"
        handleChange={handleChange}
        value={values.vcPhone}
      />
    </>
  );
};
export default VRegStep1;
