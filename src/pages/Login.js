import logo from "../logo.png";

import { Logout } from "../functions/Logout";
import { useState,useContext,useEffect } from "react";
import FormInput from "../components/FormInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Login() {
  let {state,dispatch}=useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    parentEmail: "",
    password: "",
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  useEffect(() => {
    const userType=localStorage.getItem("userType");
    console.log(userType)
 
      switch(userType){

        case "v":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break;  
        case "vu":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break;  
        case "vr":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break;  
        case "vrr":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break; 
        case "p":   notifyToast("Unauthorised", "error");
                    navigate("/parentHome");
                    break;
        case "a":   notifyToast("Unauthorised", "error");
                    navigate("/AdminDash");
                    break;
        case "UNKNOWN":Logout();
        default:    
                    break
        }
    
 
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const { Email, password } = values;

    const response = fetch("/login", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email,
        password,
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {

          res.json().then((json) => {
            // console.log(json,"stateeeee")

            const {userType}=json
            localStorage.setItem("userType",userType);
            console.log(json);
          //notifyToast("Successful Login", "success");
          switch(userType){

          case "p":   navigate("/parentHome");
                      notifyToast("Successful Login", "success");
                      break;
          case "v":   navigate("/VCDash");
                      notifyToast("Successful Login", "success");
                      break;
          case "vu":   notifyToast("Unauthorised", "error");
                      navigate("/vcdash");
                      break;  
          case "vr":   notifyToast("Unauthorised", "error");
                      navigate("/vcdash");
                      break;  
          case "vrr":   notifyToast("Unauthorised", "error");
                      navigate("/vcdash");
                      break; 
          case "a":   navigate("/AdminDash");
                      notifyToast("Successful Login", "success");
                      break;
          default:    notifyToast("Successful Login with unknown user type", "success");
                      localStorage.setItem("userType","UNKNOWN")
                      break
          }
        })
          
          break;
        }
        case 400: {
          res.json().then((json) => {
            json.error.forEach((error) => {
              notifyToast(error.msg);
            });
          });
          break;
        }
        case 500: {
          notifyToast("There was some problem");
          break;
        }
        default:
          break;
      }
      //   if (res.status === 201) {
      //     notifyToast("Registered successfully");
      //   }
      //   if (res.status === 500) {
      //     notifyToast("Monday hai");
      //   }
      //   if (res.status === 400) {
      //     return res.json();
      //   }
      // })
      // .then((json) => {
      // json.error.forEach((error) => {
      //   notifyToast(error.msg);
      //   // });
    });
  };
  const onKeyDownHandler = e => {
    if (e.key==='Enter') {
      handleSubmit()
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
            <p>New User?</p>

            <input
              type="button"
              className="btn btn-shadow"
              value="Register >>"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>

      <div className="regform">
        <div className="RegStep">
        <form className="reg-form" onSubmit={handleSubmit} onKeyDown={onKeyDownHandler}>
            <h1 className="primary title">Login</h1>
            <h2 className="st ">Enter your credentials</h2>

            <FormInput
              type="text"
              name="Email"
              labeltext="Email:"
              inputIcon="mail"
              placeholder="Enter your email"
              handleChange={handleChange}
              value={values.Email}
            />
            <br />
            <FormInput
              labeltext="Password"
              type="password"
              name="password"
              inputIcon="lock"
              value={values.password}
              handleChange={handleChange}
              placeholder="Enter Password"
            />
       
          <br />

          <div className="stepButtons">
            <button
              className="btn"
              disabled={true}
              
            >
              {"<< Back"}
            </button>
            <button
              className="btn"
              onSubmit={handleSubmit}
              
            >
            {"Login >>"}
            </button>
          </div>
          
        </form>
        </div>  
      </div>
      </div>
    </div>
  );
}

export default Login;
