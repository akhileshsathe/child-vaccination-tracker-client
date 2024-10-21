
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { useNavigate } from "react-router-dom";

import logo from "../logo.png";
import RegStep1 from "../components/RegStep1";
import RegStep2 from "../components/RegStep2";
import RegStep3 from "../components/RegStep3";
import RegStep4 from "../components/RegStep4";
import RegStep5 from "../components/RegStep5";
function SignUp2() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    parentName: "",
    Email: "",
    cEmail:"",
    parentPhone: "",
    parentDOB: "",
    userType:"p",
    addrHouseNo: "",
    addrLocality: "",
    addrRoad: "",
    addrCity: "",
    addrTaluka: "",
    addrDistrict: "",
    addrState: "",
    addrCountry: "India",
    addrPinCode: "",
    locationLat:"",
    locationLon:"",
    childName: "",
    childDOB: "",
    childGender: "male",
    password: "",
    cpassword: "",

  });
  const[locationLat,setLocationLat]=useState(null);
  const[locationLon,setLocationLon]=useState(null);
  let name, value;
  const validate = (e) => {
    switch (step) {
      case 1: {//Parent Details
        if (values.parentName.length < 1) {
          notifyToast("Parent's Name cannot be Empty", "error");
          return false;
        } else if (values.parentName.length < 3) {
          notifyToast("Parent's Name is too short", "error");
          return false;
        }
          else if (values.parentPhone.length < 1) {
            notifyToast("Phone number is required.", "error");
            return false;
        }
        else if(!values.parentPhone.match(/^\d{10,10}$/)){
          notifyToast("Phone number is invalid", "error");
          return false;
        }
        else if (!values.parentDOB) {
          notifyToast("Parent DOB is required", "error");
          return false;
        }
        else if (Date.parse(Date())-Date.parse(values.parentDOB)<=568024668) {
          notifyToast("Invalid date of birth", "error");
          return false;
        }
        else return true;
        
         
      } 

      case 2: {//Address

        if (values.addrHouseNo.length < 1) {
          notifyToast("House No. cannot be Empty", "error");
          return false;
        } else if (values.addrLocality.length < 1) {
          notifyToast("Locality is too short", "error");
          return false;
        } 
        else if (values.addrCity.length < 1) {
          notifyToast("City/Town is too short", "error");
          return false;
        } 
        else if (values.addrTaluka.length < 1) {
          notifyToast("Taluka/Tehsil is too short", "error");
          return false;
        } 
        else if (values.addrDistrict.length < 1) {
          notifyToast("District is too short", "error");
          return false;
        } 
        else if (values.addrState.length < 1) {
          notifyToast("State is too short", "error");
          return false;
        } 
        else if (values.addrCountry.length < 1) {
          notifyToast("Country is too short", "error");
          return false;
        } 
        else if (values.addrPinCode.length < 1) {
          notifyToast("Pin Code is required ", "error");
          return false;
        }
        else if(!values.addrPinCode.match(/^\d{6,6}$/)){
          notifyToast("Pin Code is invalid", "error");
          return false;
        }
        else if(locationLat==null){
          notifyToast("Please provide your location", "error");
          handleGetLocation();
          return false;
        }
        
        else return true;
      }

      case 3:{//Child Details
        if (values.childName.length < 1) {
          notifyToast("Child's Name is required", "error");
          return false;
        } else if (!values.childDOB) {
          notifyToast("Child DOB is required", "error");
          return false;
        }       
        
        else return true;
      }
        

      case 4:{//Password
        if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          notifyToast("Please set a strong password", "error");
          return false;
        }else if (!values.password.match(values.cpassword)){
          notifyToast("Passwords do not match", "error");
          return false;
        }
        else return true;
      }
      case 5:{//Password
          if (!values.Email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            notifyToast("Please enter a valid Email", "error");
            return false;
          }else if (!values.Email.match(values.cEmail)){
            notifyToast("Emails do not match", "error");
            return false;
          }
          else return true;
        }
      default:
        return false;
    }
  };
  const handleNext = (e) => {
    console.log(step);

    if (step === 1) {
      if (validate()) {
        //disablePrevButton()
        setStep(2);
      }
    }
    if (step === 2) {
      if (validate()) {
        setStep(3);
      }
    }
    if (step === 3) {
      if (validate()) {
        setStep(4);
      }
    }
    if (step === 4) {
      if (validate()) {
        setStep(5);
        //disableNextButton()
      }
    }
    if (step === 5) {
      if (validate()) {
        
        handleSubmit(e);
        //disableNextButton()
      }
      
    }
  };
  const handlePrev = (e) => {
    if (step > 1) {
      setStep(step - 1);
      if (step >= 5) {
      }
    }
  };
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  function handleGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationLat(position.coords.latitude);
          setLocationLon(position.coords.longitude);
          console.log(locationLat)
        },
        error => {
          console.log(error);
          if(error.code===1){
            alert("Please allow location permission")
          }
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      parentName,
      Email,
      parentPhone,
      parentDOB,
      userType,
      addrHouseNo,
      addrLocality,
      addrRoad,
      addrCity,
      addrTaluka,
      addrDistrict,
      addrState,
      addrCountry,
      addrPinCode,
  
      childName,
      childDOB,
      childGender,
      password,
    } = values;

    
    const response = fetch("/parentRegister", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentName,
        Email,
        parentPhone,
        parentDOB,
        userType,
        address:{
          addrHouseNo,
      addrLocality,
      addrRoad,
      addrCity,
      addrTaluka,
      addrDistrict,
      addrState,
      addrCountry,
      addrPinCode,
        },
                locationLat:locationLat,
        locationLon:locationLon,
        childName,
        childDOB,
        childGender,
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
        return <RegStep1 values={values} handleChange={handleChange} />;

      case 2:
        return <RegStep2 values={values} handleChange={handleChange} handleGetLocation={handleGetLocation}/>;

      case 3:
        return <RegStep3 values={values} handleChange={handleChange} />;

      case 4:
        return <RegStep4 values={values} handleChange={handleChange} />;
      case 5:
        return <RegStep5 values={values} handleChange={handleChange} />;
      default:
        return <RegStep1 values={values} handleChange={handleChange} />;
    }
  };
  return (
    <div className="auth-background fWhite">
      <div className="signup-container">
        <div className="top">
          <div className="top-item logo">
            <img
              src={logo}
              className=" logo-large "
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
              disabled={step > 5 ? true : false}
              onClick={handleNext}
            >
              {step === 5 ? "Sign Up >>" : "Next >>"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp2;
