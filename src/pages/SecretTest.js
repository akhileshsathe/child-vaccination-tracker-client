
import logo from "../logo.svg";

import { Link } from "react-router-dom";
import { useState } from "react";
import FormInput from "../components/FormInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import PageAside from "../components/PageAside";
import { useNavigate } from "react-router-dom";
import PasswordChecker from "../components/PasswordChecker";
import RegStep4 from "../components/RegStep4";
function Login() {
  const navigate= useNavigate();
  const [values, setValues] = useState({

    // parentEmail: "",
    // password: "",

    cpassword:"",  
    password:"",

  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const {

  //     parentEmail,
  //     password,

  //   } = values;

  //   const response = fetch("/secret", {
  //     method: "POST",

  //     headers: {
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       parentEmail,
  //       password,
  //     }),
  //   });
  //   //   response  .then(res => res.json())
  //   //   .then(json => console.log(json))
  //   response.then((res) => {
  //     switch (res.status) {
  //       case 201: {
  //         notifyToast("Success 201","success");
  //         break;
  //       }
  //       case 400: {
  //           notifyToast("Failed 400","error");
  //         break;
  //       }
  //       case 500: {
  //         notifyToast("Faile 500","error");
  //         break;
  //       }
  //       default:break;
  //     }
  //     //   if (res.status === 201) {
  //     //     notifyToast("Registered successfully");
  //     //   }
  //     //   if (res.status === 500) {
  //     //     notifyToast("Monday hai");
  //     //   }
  //     //   if (res.status === 400) {
  //     //     return res.json();
  //     //   }
  //     // })
  //     // .then((json) => {
  //     // json.error.forEach((error) => {
  //     //   notifyToast(error.msg);
  //     //   // });
  //   });
  // };
  return (
   <div className="LoginAside">

      <div className="regform">
        <form className="reg-form" >
        {/* onSubmit={handleSubmit} */}
          <input
            className="submitButton fAccent"
            type="submit"
            value="Test"
          />

        </form>
      </div>



      <RegStep4 values={values} handleChange={handleChange}/> 
      <ToastContainer />
    </div>
   
  );
}

export default Login;
