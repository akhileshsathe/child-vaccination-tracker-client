// import { json } from "react-router-dom";
import logo from "../logo.svg";
import { Logout } from "../functions/Logout";
import { useNavigate } from "react-router-dom";

const VCNavBar = (nav) => {
  const navigate = useNavigate();
  return (
    <div className="navContainer top">
    <div className="nav-bar bAccent">
      <div className="nav-image-items">
      <img
        src={logo}
        className="logo logo-small "
        alt="Child Vaccination Tracker"
      />

      <div className="nav-links">
        
        
        

        {/* {console.log(childArray.map((arr)=>{return {value: arr._id,label:arr.childName}}))} */}

        <div className="nav-item primary" onClick={()=>navigate("/VCDash")}>
          <span className="material-symbols-outlined nav-icon">calendar_month</span>
          {' '}Dashboard
          </div>
        <div className="nav-item primary" onClick={()=>navigate("/VCManageVaccines")}>
          <span className="material-symbols-outlined nav-icon">add_circle</span>
          {' '}Manage Vaccines
          </div>
        <div className="nav-item primary" onClick={()=>navigate("/VCappointments")}>
        <span className="material-symbols-outlined nav-icon">event</span>
          Appointments
          </div>
        <div className="nav-item primary" onClick={()=>navigate("/help")}>
        <span className="material-symbols-outlined nav-icon">help</span>
          Help
          </div>  
        <div className="nav-item primary" onClick={()=>navigate("/notification")}>
          <span className="material-symbols-outlined nav-icon">Notifications</span>
          Notifications
          </div>
          <div className="nav-item primary" onClick={()=>navigate("/notification")}>
          <span className="material-symbols-outlined nav-icon">settings</span>
          Settings
          </div>
        <div className="nav-item primary" onClick={()=>{Logout();navigate("/login")}}>
          <span className="material-symbols-outlined nav-icon">Logout</span>
          Logout
          </div>
      </div>
      </div>
    </div>
  </div>
  );
};
export default VCNavBar;

