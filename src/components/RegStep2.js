import React from "react";
import FormInput from "./FormInput";

const RegStep2 = ({ handleChange, values,handleGetLocation}) => {
  return (
    <>
      <h2 className="st">Enter your Address</h2>
      <div className="reg-container">
      <div className="flex-row">
      <FormInput name="addrHouseNo"
        type="text"
        
        labeltext="House No:"
        placeholder="House No."
        inputIcon="home"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrHouseNo}/>

      <FormInput name="addrLocality"
        type="text"
        
        labeltext="Locality:"
        placeholder="Locality"
        inputIcon="traffic"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrLocality} />
      
      <FormInput name="addrRoad"
        type="text"
        
        labeltext="Road:"
        placeholder="Road/Street"
        inputIcon="signpost"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrRoad}
      />
      </div>
      <div className="flex-row">
      
      <FormInput
        type="text"
        name="addrCity"
        labeltext="City/Town/Village:"
        placeholder="City/Town/Village"
        inputIcon="location_city"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrCity}
      />

      <FormInput
        type="text"
        name="addrTaluka"
        labeltext="Taluka/Tehsil:"
        placeholder="Taluka/Tehsil"
        inputIcon="home"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrTaluka}
      />
      <FormInput
        type="text"
        name="addrDistrict"
        labeltext="District:"
        placeholder="District"
        inputIcon="holiday_village"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrDistrict}
      />
      </div>
      <div className="flex-row">
      {/* <FormInput
        type="text"
        name="addrState"
        labeltext="State:"
        placeholder="State"
        inputIcon="landscape"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrState}
      /> */}

<div className="flex-item">
              <label className="secondary" htmlFor="vDesc">
                State:
                <div className="SelectContainer">
                  {/* <span className="material-symbols-outlined formicon">{inputIcon}</span> */}

                  <select name="addrState"
onChange={handleChange}
value={values.addrState}
className="Form-input name form-select SelectContainer"


>
  <option value="" disabled>--Select State--</option>
  <optgroup label="States">
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
  </optgroup>
  <optgroup label="Union Territories">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="DNHDD">DNHDD</option>
    <option value="Delhi">Delhi</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </optgroup>
</select>
                </div>
              </label>
            </div>





      <FormInput
        type="text"
        name="addrCountry"
        labeltext="Country:"
        placeholder="Country"
        inputIcon="flag"
        disable="true"
        labelClassName="flex-item"
        handleChange={handleChange}
        value={values.addrCountry}
      />
      
       
      <FormInput
        type="text"
        name="addrPinCode"
        labeltext="Pin Code:"
        placeholder="Pin Code"
        inputIcon="pin_drop"
        labelClassName="flex-item"
        handleChange={handleChange}
        
        value={values.addrPinCode}
        
      />
      </div>
      <div className="flex-row">
        <div className="center btn" onClick={handleGetLocation}>Find your Location</div>
      </div>
      </div>
    </>
  );
};
export default RegStep2;
