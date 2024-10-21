
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

import logo from "../logo.svg";

function AdminSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    adminName: "",
    Email: "",
    cvcEmail:"",
    adminPhone: "",
    adminDOB:"",
    
    userType:"a",
    
    level:'',
    

    isApproved: false,
    password: "",
    cpassword: "",
  });
  let name, value;
  const validate = (e) => {
    //VC Details
        if (values.adminName.length < 1) {
          notifyToast("Admin Name cannot be Empty", "error");
          return false;
        } else if (values.adminName.length < 3) {
          notifyToast("Admin Name is too short", "error");
          return false;
        }
        if (!values.Email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          notifyToast("Please enter a valid Email", "error");
          return false;
        }
          else if (values.adminPhone.length < 1) {
            notifyToast("Phone number is required.", "error");
            return false;
        }
        else if(!values.adminPhone.match(/^\d{10,10}$/)){
          notifyToast("Phone number is invalid", "error");
          return false;
        }
        else if (!values.adminDOB) {
          notifyToast("Child DOB is required", "error");
          return false;
        }
        if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          notifyToast("Please set a strong password", "error");
          return false;
        }else if (!values.password.match(values.cpassword)){
          notifyToast("Passwords do not match", "error");
          return false;
        }


        else return true;
    
  };

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    const {
      adminName,
      Email,
      adminPhone,
      adminDOB,
      userType,
      level,
      isApproved,
      password,
    } = values;
  
    
    const response = fetch("/register", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminName,
        Email,
        adminPhone,
        adminDOB, 
        userType,
        level,
        isApproved,
        password,
        
      }),
    });

    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Registred Successfully","success");
          break;
        }
        case 400: {
          res.json().then((json) => {
            json.error.forEach((error) => {
              notifyToast(error.msg,"error");
            });
          });
          break;
        }
        case 500: {
          notifyToast("Monday hai");
          break;
        }
        default:
          break;
      }
    });
  };
  
  return (
    <div className="auth-background fWhite">
      <div className="signup-container">
        <div className="top">
          <div className="top-item logo">
            <img
              src={logo}
              className=" logo-small "
              alt="Child Vaccination Tracker"
            />
          </div>
          <div className="top-item">
            <p>Already have an account?</p>

            <input
              type="button"
              className="btn btn-shadow"
              value="Login >>"
              onClick={() => {
                navigate("/login");
              }}
            />  
          </div>
        </div>

        <div className="regform">
          <form className="reg-form" onSubmit={handleSubmit}>
          <div className="RegStep">
          <h2 className="st">Admin Registration</h2>
     
      
            <FormInput
        type="password"
        labeltext="Password:"
        name="password"
        placeholder="Password"
        handleChange={handleChange}
        value={values.password}
      />
            <FormInput
        type="password"
        labeltext="Confirm Password"
        name="cpassword"
        placeholder="Confirm Password"
        handleChange={handleChange}
        value={values.cpassword}
      />
        </div>
          </form>

          <div className="stepButtons">
            <button
              className="btn"
              disabled={step === 1 ? true : false}
              
              
            >
              {"<< Back"}
            </button>
            <button
              className="btn"
              
              onClick={handleSubmit}
            >
              {"Sign Up >>"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminSignup;
