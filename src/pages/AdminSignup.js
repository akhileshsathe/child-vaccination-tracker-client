
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { useNavigate } from "react-router-dom";

import logo from "../logo.svg";
import ARegStep1 from "../components/ARegStep1";
import ARegStep2 from "../components/ARegStep2";
function SignUp2() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    adminName: "",
    Email: "",

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
    switch (step) {
      case 1: {//Parent Details
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
        else return true
        
      }
        

      case 2:{//Password
        if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          notifyToast("Please set a strong password", "error");
          return false;
        }else if (!values.password.match(values.cpassword)){
          notifyToast("Passwords do not match", "error");
          return false;
        }
        else return true;
      }
      
      default:
        return false;
    }
  };
  const handleNext = (e) => {
    //console.log(step);

    if (step === 1) {
      if (validate()) {
        //disablePrevButton()
        setStep(2);
      }
    }
    if (step === 2) {
     
      if (validate()) {
        
        handleSubmit(e);
        //disableNextButton()
      }
      
    }
  };
  const handlePrev = (e) => {
    if (step > 1) {
      setStep(step - 1);
      if (step >= 2) {
      }
    }
  };
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    //console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    
    const response = fetch("/adminRegister", {
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
  const StepRender = (values, handleChange) => {
    switch (step) {
      case 1:
        return <ARegStep1 values={values} handleChange={handleChange} />;

      case 2:
        return <ARegStep2 values={values} handleChange={handleChange} />;

      
      default:
        return <ARegStep1 values={values} handleChange={handleChange} />;
    }
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
             {StepRender(values, handleChange)}
             </div>
          </form>

          <div className="stepButtons">
            <button
              className="btn"
              disabled={step === 1 ? true : false}
              onClick={handlePrev}
              
            >
              {"<< Back"}
            </button>
            <button
              className="btn"
              disabled={step > 2 ? true : false}
              onClick={handleNext}
            >
              {step === 2 ? "Sign Up >>" : "Next >>"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp2;
