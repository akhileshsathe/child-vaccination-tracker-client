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
  const getAge = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    const diffMilliseconds = Math.abs(today - birthDate);
    const days = Math.floor(diffMilliseconds / 86400000);
    const weeks=Math.floor(diffMilliseconds / 86400000/7);
    // console.log(( Date.parse(today)-Date.parse(birthDate))/86400 )
    //var w=Math.floor((Date.parse(today)-Date.parse(birthDate) )/604800);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    return days;
  }
const readableDate=(inputDate)=>{
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString(undefined, options);
}
  const navigate = useNavigate();

  const [selectValue, setSelectValue] = useState("");

  function handleSelectChange(event) {
    setSelectValue(event.target.value);
    console.log(selectValue);
  }
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const searchChild = (arr, id) => {
    for (const ele of arr) {
      if (ele._id === id) {
        return ele;
      }
    }
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
          localStorage.setItem("Email",json.Email);
          setLoading(false);
        });
        
      }
      if (res.status === 401) {
        localStorage.setItem("userType", "UNKNOWN");
        Logout();
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
  //const x = searchChild(userData.children, selectValue) || userData.children[0];
  return (
    <div>
      <div className="Parentcontainer">
        
      <div className="Nbackground ">

        <div className="belowNav">
          <div>
          {userData.userType=="vu"?<p>Your account is yet to be Approved.</p>:""}
          {userData.userType=="vr"?<p>Admin has disapproved your account.<br/>Reason:{userData.remark}</p>:""}
          {userData.userType=="vrr"?<p>Your request to reapprove your account is in the process.</p>:""}
          </div>



        <ToastContainer />
      </div>  
      </div>
      </div>
    </div>
  );
}

export default VCDash;
