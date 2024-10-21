import { useState, useEffect, useContext } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";

import { useLocation } from "react-router-dom";




function BookAppointment() {
  const { state } = useLocation();
  const[userData,setUserData]=useState(state.userData);
  const[timeslot,setTimeSlot]=useState("000");
  const[vDate,setVDate]=useState();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [VC, setVC] = useState();


 

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  function getCurrentDate() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate()+1;
    const year = now.getFullYear();
  
    if (month < 10) {
      month = `0${month}`;
    }
  
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  }

  function getSevenDaysDate() {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    let month = now.getMonth() + 1;
    let day = now.getDate();
    const year = now.getFullYear();
  
    if (month < 10) {
      month = `0${month}`;
    }
  
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  }
  
 const GetAppointment=()=>{
  if(!window.confirm("Do you want to proceed?")) return false;

console.log(state)
  const response = fetch("/BookAppointment", {
    method: "POST",

    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...state,
    }),
  });

  response.then((res) => {
    switch (res.status) {
      case 201: {
        notifyToast("Appointment booked successfully","success");
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
  });

 }

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType != "p") {
      switch (userType) {
        case "a":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "v":
            notifyToast("Unauthorised", "error");
            navigate("/vcDash");
            break;
        case "vrr":
            notifyToast("Unauthorised", "error");
            navigate("/vcDash");
            break;
        case "vu":
            notifyToast("Unauthorised", "error");
            navigate("/vcDash");
            break;
        case "vr":
            notifyToast("Unauthorised", "error");
            navigate("/vcDash");
            break;
        default:
          notifyToast("Login First", "error");
          localStorage.setItem("userType", "UNKNOWN");
          navigate("/login");
          break;
      }
    }
setLoading(false);
  
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    

    const response = fetch("/BookChild", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
      }),
    });

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
    });
  };


  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="ManageVaccine-container ">
        <div className="Nbackground  ">
        <div className="belowNav">
          <div className="vMgmntActions Margin5">
            <h1>
              Confirm Appointment <br />
            </h1>

            <div className="Note">
              --Please Confirm your appoinment details before proceeding.--
            </div>

            <table className="timeslot-table">
              <thead>
                <th colSpan="2">Appoinment Details</th>

              </thead>

              <tr>
                <th>Parent's Name</th>
                <td>{state.userData.parentName}</td>

              </tr>
              <tr>
                <th>Child's Name</th>
                <td>{state.child.childName}</td>

              </tr>
              <tr>
                <th>Vaccination Name</th>
                <td>{state.vaccine.vName}</td>

              </tr>
              <tr>
                <th>Vaccination Center</th>
                <td>{state.vc.vcName}</td>

              </tr>
              <tr>
                <th>Appointment Date:</th>
                <td>{state.vDate}</td>

              </tr>
              <tr>
                <th>Appointment Timeslot:</th>
                <td>{state.timeslot}</td>

              </tr>
              <tr className="border-hidden">
                <td className="border-hidden">                  
                <button
                  className="button btn2 fWhite bGrey"
                  onClick={() => navigate(-1)}
                  >
                  {"<< "}Cancel Appoinment
                  </button></td>
                <td className="border-hidden">                          
                  <button
                  className="button btn2 fWhite bGreen"
                  onClick={() => GetAppointment()}
                  >
                  Confirm Appointment{" >>"}
                  </button>
                </td>

              </tr>
            </table>
          </div>

          
        </div>
      </div>
      </div>
    </>
  );
}

export default BookAppointment;
