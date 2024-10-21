
import { useState,useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { useNavigate } from "react-router-dom";
import { useContext,useReducer } from "react";
import logo from "../logo.svg";
import VRegStep1 from "../components/VRegStep1";
import VRegStep2 from "../components/VRegStep2";
import VRegStep3 from "../components/VRegStep3";
import VRegStep4 from "../components/VRegStep4";
function VCSignUp() {



  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const[locationLat,setLocationLat]=useState(null);
  const[locationLon,setLocationLon]=useState(null);



  const [values, setValues] = useState({
    vcName: "",
    Email: "",
    cvcEmail:"",
    vcPhone: "",
    vcOwnerName:"",
    vaccines:"",
    userType:"vu",
    
    vcRating:{
      vcAvgRating:0,
    },
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
    isApproved: false,
    password: "",
    cpassword: "",
  });
  let name, value;
  const validate = (e) => {
    switch (step) {
      case 1: {//VC Details
        if (values.vcName.length < 1) {
          notifyToast("Vaccination Center Name cannot be Empty", "error");
          return false;
        } else if (values.vcName.length < 3) {
          notifyToast("Vaccination Center is too short", "error");
          return false;
        }else if (values.vcOwnerName.length < 1) {
          notifyToast("Owners's is required.", "error");
          return false;
      }
      else if (values.vcOwnerName.length < 3) {
        notifyToast("Owners's is too short", "error");
        return false;
      }
          else if (values.vcPhone.length < 1) {
            notifyToast("Phone number is required.", "error");
            return false;
        }
        else if(!values.vcPhone.match(/^\d{10,10}$/)){
          notifyToast("Phone number is invalid", "error");
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


        

      case 3:{//Password
        if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          notifyToast("Please set a strong password", "error");
          return false;
        }else if (! values.password.match(values.cpassword)){
          notifyToast("Passwords do not match", "error");
          return false;
        }
        else return true;
      }
      case 4:
        {//Password
          if (!values.Email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            notifyToast("Please enter a valid Email", "error");
            return false;
          }else if (! values.Email.match(values.cparentEmail)){
            notifyToast("EMails do not match", "error");
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
        
        handleSubmit(e);
        //disableNextButton()
      }
    }

  };
  const handlePrev = (e) => {
    if (step > 1) {
      setStep(step - 1);
      if (step >= 4) {
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
      vcName,
      Email,
      vcPhone,
      vcOwnerName,
      vaccines,
      userType,
      vcRating,
      isApproved,

      addrHouseNo,
      addrLocality,
      addrRoad,
      addrCity,
      addrTaluka,
      addrDistrict,
      addrState,
      addrCountry,
      addrPinCode,
  
      
      password,
    } = values;

    
    const response = fetch("/vcRegister", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vcName,
        Email,
        vcPhone,
        vcOwnerName,
        vaccines,
        userType,
        vcRating,
        isApproved,

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
        return <VRegStep1 values={values} handleChange={handleChange} />;

      case 2:
        return <VRegStep2 values={values} handleChange={handleChange} handleGetLocation={handleGetLocation}/>;

      case 3:
        return <VRegStep3 values={values} handleChange={handleChange} />;
      case 4:
        return <VRegStep4 values={values} handleChange={handleChange} />;
      default:
        return <VRegStep1 values={values} handleChange={handleChange} />;
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
              disabled={step > 5 ? true : false}
              onClick={handleNext}
            >
              {step === 4 ? "Sign Up >>" : "Next >>"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default VCSignUp;
