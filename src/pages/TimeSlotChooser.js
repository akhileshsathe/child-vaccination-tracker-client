import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TrackerItem from "../components/TrackItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";



function TimeSlotChooser() {
  const timeSlots = [
    "08:00AM-09:00AM",
    "09:00AM-10:00AM",
    "10:00AM-11:00AM",
    "11:00AM-12:00PM",
    "12:00PM-01:00PM",
    "01:00PM-02:00PM",
    "02:00PM-03:00PM",
    "03:00PM-04:00PM",
    "04:00PM-05:00PM",
    "05:00PM-06:00PM",
    "06:00PM-07:00PM",
    "07:00PM-08:00PM",
    "08:00PM-09:00PM",
    "09:00PM-10:00PM",
    
    

    

  ];
  const { state } = useLocation();
  const[userData,setUserData]=useState(state.userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [VC, setVC] = useState(state.VC);
  const [selectedTime, setSelectedTime] = useState(null);

  const [values, setValues] = useState({
    Email: localStorage.getItem("Email"),
    
  });



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


  }, []);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Email, childName, childDOB, childGender } = values;

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
    });
  };

  const handleSelect = (time) => {
    setSelectedTime(time);
  };

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div>
      <h2>Select a time slot:</h2>
      <div className="time-slots">
        {timeSlots.map((time) => (
          <div
            key={time}
            className={`time-slot ${selectedTime === time ? "selected" : ""}`}
            onClick={() => handleSelect(time)}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};




export default TimeSlotChooser;
