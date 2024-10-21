
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import NavBar from "../components/NavBar";
import RegStep3 from "../components/RegStep3";


function AddChild() {
  const [values, setValues] = useState({
    
    Email: localStorage.getItem("Email"),

    address: "",
    childName: "",
    childDOB: "",
    childGender: "male",

  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {

      Email,
      childName,
      childDOB,
      childGender,

    } = values;

    const response = fetch("/addchild", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email,
        childName,
        childDOB,
        childGender,
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Child added successfully");
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
  return (
    
    <div className="Nbackground container">

      <div className="regform">
        <div className="empty-col"></div>
        <form className="reg-form" onSubmit={handleSubmit}>
    
        <div className="RegStep">
        <RegStep3 values={values} handleChange={handleChange} />
             </div>
             <div className="stepButtons">
            <button
              className="btn"
              disabled={true}
              
            >
              {"<< Back"}
            </button>
            <button
              className="btn2"
              onSubmit={handleSubmit}
            >
            {"Add Child>>"}
            </button>
          </div>    
        </form>
      </div>
      <ToastContainer />
    </div>

  );
}

export default AddChild;
