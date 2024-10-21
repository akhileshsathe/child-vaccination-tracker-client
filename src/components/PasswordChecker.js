import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";

const PasswordChecker = ({ values }) => {
    var min_8_char,min_1_upper,min_1_lower,min_1_spcl;
    const [password,setPassword]=useState(values.password)
    useEffect(() => {
        if(values.password!=password){
            setPassword(password)
        // console.log(values,"kdefhbekfbki")
        
        if(!password.length>=8){
            min_8_char="checked_condition"
            console.log("here")
           
        }else {
            min_8_char="unchecked_condition"
            
        }
        
        if(values.password.match(/^[A-Z]+/)){
            min_1_upper="checked_condition"
        }else
        {
            min_1_upper="unchecked_condition"
    
        }
        if(!values.password.match(/[a-z]+/)){
            min_1_lower="checked_condition"
        }
        else{
            min_1_lower="unchecked_condition"
    
        }
        if(!values.password.match(/^(?=.*[@$!%*#?&])$/)){
            min_1_spcl="checked_condition"
        }
        else{
            min_1_spcl="unchecked_condition"
    
        }
    }
    

    },[values.password])
    
  return (
    <>

        <div className="centered">
        <span className="material-symbols-outlined rmargin-10">
info
</span>
{'   '}Set a Strong Password.
</div>
<ul>
  {/* <li id="min">Minimum 8 characters</li> */}
  <li className={min_8_char}>Minimum 8 characters</li>
  <li className={min_1_upper}>Minimum 1 uppercase letter</li>
  <li className={min_1_lower}>Minimum 1 lowercase letter</li>
  <li className={min_1_spcl}>Minimum 1 special character</li>

  


</ul>
    </>
  );
};
export default PasswordChecker;
