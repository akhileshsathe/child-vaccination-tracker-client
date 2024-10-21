// import { json } from "react-router-dom";
import logo from "../logo.png";
import {useContext} from "react"
import { Logout } from "../functions/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const NavBar = (nav) => {
  let {state,dispatch}=useContext(UserContext);
  const navigate = useNavigate();
  var navItems;
  switch(localStorage.getItem("userType")){
    case "p":{navItems=
      [{onClickLink:"/parentHome",icon:"calendar_month",title:" Tracker"},
      {onClickLink:"/addchild",icon:"add_circle",title:" Add Child"},
      {onClickLink:"/parentAppointments",icon:"event",title:" Appointments"},
      
      //{onClickLink:"/parentSettings",icon:"settings",title:" Settings"},

      //{onClickLink:"/parentHelp",icon:"help",title:" Help"}, 
    ];
    break;
  }
  case "v":{navItems=
    [{onClickLink:"/VCDash",icon:"calendar_month",title:" DashBoard"},
    {onClickLink:"/VCManageVaccines",icon:"add_circle",title:" Manage Vaccines"},
    {onClickLink:"/VCappointments",icon:"event",title:" Appointments"},
   
    {onClickLink:"/VCSettings",icon:"settings",title:" Settings"},
    // {onClickLink:"VCHelp",icon:"help",title:" Help"}, 
  ];
  break;
}
case "vu":{navItems=
  [{onClickLink:"/VCDash",icon:"calendar_month",title:" DashBoard"},
  // {onClickLink:"VCHelp",icon:"help",title:" Help"}, 
];
break;
}
case "vr":{navItems=
  [{onClickLink:"/VCDash",icon:"calendar_month",title:" DashBoard"},
  // {onClickLink:"VCHelp",icon:"help",title:" Help"}, 
];
break;
}
case "vrr":{navItems=
  [{onClickLink:"/VCDash",icon:"calendar_month",title:" DashBoard"},
  // {onClickLink:"VCHelp",icon:"help",title:" Help"}, 
];
break;
}

case "a":{navItems=
  [{onClickLink:"/AdminDash",icon:"calendar_month",title:" DashBoard"},
  {onClickLink:"/AManageVaccines",icon:"add_circle",title:" Manage Vaccines"},
  {onClickLink:"/AManageVC",icon:"event",title:" VC Approval"},
  // {onClickLink:"/VCSettings",icon:"settings",title:" Settings"},
  // {onClickLink:"adminHelp",icon:"help",title:" Help"}, 
];
break;
}

default:navItems="INVISIBLE"
break;

  }


  if (navItems=="INVISIBLE" || state ) {
    return <></>;
  }
  return (
    
    <div className="navContainer  top">
    <div className="nav-bar Navbackgroun  bAccent">
      <div className="nav-image-items">
      <img
        src={logo}
        className="logo logo-small "
        alt="Child Vaccination Tracker"
      />

      <div className="nav-links">
        
      {/* {onClickLink:"parentSettings",icon:"setttings",title:" Settings"}, */}
        
        






          {navItems.map((item) => {
            return (
              
              <div key={item.title} className="nav-item primary" onClick={()=>navigate(item.onClickLink)}>
          <span className="material-symbols-outlined nav-icon">{item.icon}</span>
          {item.title}
          </div>
            );
          })}
              <div className="nav-item primary" onClick={()=>{Logout();navigate("/login ")}}>
          <span className="material-symbols-outlined nav-icon">Logout</span>
          Logout
          </div> 

        {/* <div className="nav-item primary" onClick={()=>navigate("/parenthome")}>
          <span className="material-symbols-outlined nav-icon">calendar_month</span>
          {' '}Tracker
          </div>
        <div className="nav-item primary" onClick={()=>navigate("/addchild")}>
          <span className="material-symbols-outlined nav-icon">add_circle</span>
          {' '}Add child
          </div>
        <div className="nav-item primary" onClick={()=>navigate("/parentappointments")}>
        <span className="material-symbols-outlined nav-icon">event</span>
          Appointments
          </div>
        <div className="nav-item primary" onClick={()=>navigate("/help")}>
        <span className="material-symbols-outlined nav-icon">help</span>
          Help
          </div>  
        <div className="nav-item primary" onClick={()=>navigate("/vcdash")}>
          <span className="material-symbols-outlined nav-icon">Notifications</span>
          Notifications
          </div>



          {<div className="nav-item primary" onClick={()=>navigate("/"+)}>
          <span className="material-symbols-outlined nav-icon">Notifications</span>
          Notifications
          </div>}



        <div className="nav-item primary" onClick={()=>{Logout();navigate("/login")}}>
          <span className="material-symbols-outlined nav-icon">Logout</span>
          Logout
          </div>


          <div className="nav-item primary" onClick={()=>{Logout();navigate("/login")}}>
          <span className="material-symbols-outlined nav-icon">Logout</span>
          Logout
          </div> */}



      </div>
      </div>
    </div>
  </div>
  );
};
export default NavBar;

