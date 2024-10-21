import React from "react";
import FormInput from "./FormInput";

const RegStep3 = ({ handleChange, values }) => {
  return (
    <>
      <h2 className="st fWhite">Child's Details</h2>
      <FormInput
        type="text"
        name="childName"
        labeltext="Name:"
        inputIcon="child_care"
        placeholder="Child's Name"
        handleChange={handleChange}
        value={values.childName}
      />
        {/* <div className="flex-item">
        <label className="sx">
          Gender:
          <br/>
          <br/>
          <input
            type="radio"
            value="male"
            name="childGender"
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            value="female"
            name="childGender"
            onChange={handleChange}
          />
          Female
        </label>
        </div> */}

<div className="flex-item">
<label className="secondary">
              Gender:
              </label>
              <br />
  <div className="radio-container">
      <input id="toggle-on" className="toggle invisible-radio toggle-left"
       name="childGender"
        onChange={handleChange}
         value="male"
          
           type="radio" defaultChecked/>
<label htmlFor="toggle-on" className="tbtn">Male</label>
<input id="toggle-off"
 className="toggle invisible-radio toggle-right"
  name="childGender"
   onChange={handleChange}
    value="female"

      type="radio"/>
<label htmlFor="toggle-off" className="tbtn">Female</label>
</div>
</div>
      <FormInput
        type="date"
        labeltext="Child's Date of Birth:"
        name="childDOB"
        placeholder="Child's Date of Birth"
        handleChange={handleChange}
        value={values.childDOB}
      />

      
      <br />
    </>
  );
};
export default RegStep3;
