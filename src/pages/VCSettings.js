import { useState, useEffect,useContext } from "react";

import VCNavBar from "../components/VCNavBar";
import TrackerItem from "../components/TrackItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { UserContext } from "../App";
import { notifyToast } from "../functions/notifyToast";
import { Logout } from "../functions/Logout";
 
function VCDash() {

  let {state,dispatch}=useContext(UserContext);
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
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("");

  function handleSelectChange(event) {
    setSelectValue(event.target.value);
    console.log(selectValue);
  }
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedElements, setSelectedElements] = useState("");
  const saveTimeSlots=()=>{
    if(!window.confirm("Do you want to proceed?")) return false;
    const response = fetch("/VCTimeSlot", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id:userData._id,
        timeslots:selectedElements
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Time slots updated successfully","success");
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



  const pageDash = () => {
    fetch("/ParentHome", {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          setUserData(json);
          setSelectedElements(json.timeslots)
          localStorage.setItem("Email",json.Email);
          setLoading(false);
        });
        
      }
      if (res.status === 401) {
        navigate("/login");
      }

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  }

  useEffect(() => {
    const userType=localStorage.getItem("userType");
    if(userType!="v"  && userType!="vu" && userType!="vrr" && userType!="vr"){
      
      switch(userType){

                    
        case "p":   notifyToast("Unauthorised", "error");
                    navigate("/parentHome");
                    break;
        case "a":   notifyToast("Unauthorised", "error");
                    navigate("/AdminDash");
                    break;
        default:    notifyToast("Login First", "error");
                    localStorage.setItem("userType","UNKNOWN");
                    Logout()
                    navigate("/login");
                    break
        }
    }
    pageDash();   
  }, []);

  if (loading) {
    return <Loading/>;
  }
  if(userData.userType!=="v"){
    <div className="belowNav">
    <div>
    {userData.userType=="vu"?<p>Your account is yet to be Approved.</p>:""}
    {userData.userType=="vr"?<p>Admin has disapproved your account.<br/>Reason:{userData.remark}</p>:""}
    {userData.userType=="vrr"?<p>Your request to reapprove your account is in the process.</p>:""}
    </div>
    </div>
  }
  //const x = searchChild(userData.children, selectValue) || userData.children[0];
  return (
    <div>
      <div className="Parentcontainer">
        
      <div className="Nbackground ">

        <div className="belowNav reg-container vMgmntActions">
<h2 className="text-center"></h2>

<table className="timeslot-table">

  <thead>
    <th colSpan="2">Select Available Time Slots</th>
    <tr>
      <th>Selection</th>
      <th>Time Slot</th>
    </tr>
  </thead>
  <tbody>
    {timeSlots.map(element => (
      <tr key={element}>
        <td>
          <label htmlFor={element}>
            <input 
              className="checkbox"
              type="checkbox"
              value={element}
              id={element}
              checked={selectedElements.includes(element)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedElements(prevSelected => {
                  if (prevSelected.includes(value)) {
                    return prevSelected.filter(id => id !== value);
                  } else {
                    return [...prevSelected, value];
                  }
                });
              }}
            />
            <span class="checkmark"></span>
          </label>
        </td>
        <td>{element}</td>
      </tr>
    ))}
    <tr className="border-hidden">
        <td className="border-hidden"></td>
        <td className="border-hidden">

        <div className="btn2" onClick={saveTimeSlots}>Apply</div>
        </td>
    </tr>
  </tbody>

</table>






        <ToastContainer />
      </div>  
      </div>
      </div>
    </div>
  );
}

export default VCDash;
