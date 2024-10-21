import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TrackerItem from "../components/TrackItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";
import { UserContext } from "../App";
import VaccineEditor from "../components/VaccineEditor"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

function VCManageVaccines() {
  let {state,dispatch}=useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Vaccines, setVaccines] = useState();
  const[userData,setUserData]=useState('');
  const[Style,setStyle]=useState("");
  const [values, setValues] = useState({
    
    Email: localStorage.getItem("Email"),
    address: "",
    childName: "",
    childDOB: "",
    childGender: "",

  });
const getVCvaccines=()=> {
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

        });
        
      }
      if (res.status === 401) {
        navigate("/login");
      }

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  }

  const getVaccines = () => {
    fetch("/adminGetVaccines", {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          setVaccines(json.Vaccines);
          setLoading(false);
          dispatch({type:"USER",payload:false})
        });
        
      }


      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };

  const initialiseStyles=()=>{
    if (!Vaccines || !userData) {
      return;
    }
    Vaccines.forEach((item,index)=>{
      if(userData.vaccines.includes(item._id)){
        setStyle({ ...Style,
          [index]: { background: "green", color: "white" } });

      }
            else{
        setStyle({ ...Style,
          [index]: { background: "red", color: "white" } });

      }
      console.log(Style)
    }


    )
    

  }

  useEffect(() => {

    const userType=localStorage.getItem("userType");
    if(userType!="v" && userType!="vu" && userType!="vr" && userType!="vrr"){
      switch(userType){

                    
        case "a":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break;
        case "p":   notifyToast("Unauthorised", "error");
                    navigate("/parentHome");
                    break;
      default:    notifyToast("Login First", "error");
                    localStorage.setItem("userType","UNKNOWN")
                    navigate("/login");
                    break;
        }
    }
    getVCvaccines();
    
    getVaccines();

    
  //  initialiseStyles();


    
  }, );

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    //console.log(values);
  };




  const removeVCVaccine = (_id,index,Email=userData.Email) => {


    const response = fetch("/removeVCVaccine", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        Email
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Vaccine removed successfully","success");
       // console.log(Style)

          setStyle({ ...Style,
            [index]: { background: "#f4f4f4", color: "#444" } });

        
        
          
          
    getVCvaccines();
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
  const addVCVaccine = (_id,index,Email=userData.Email) => {
    


    const response = fetch("/addVCVaccine", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        Email
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {
          // if (userData.vaccines.includes(_id)) {
            
            setStyle({ ...Style,
              [index]: { background: "green", color: "white" } });

          notifyToast("Vaccine removed successfully","success");
          
    getVCvaccines();

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
    return <Loading/>;
  }
  return (
    
    <>
    <div className="ManageVaccine-container ">
    <div className="Nbackground ">

<div className="belowNav ">


<div className="vMgmntActions Margin5">
<h1>Manage Vaccines <br/></h1>
  
  
  <div className="Note">*Collapse each vaccine tab to show details and edit and remove functions<br/>*Green indicates that vaccine is available</div>
  
</div>

<div className="vaccine-list Margin5">

{Vaccines.map((item,index) => {
    return (
      
  <Accordion  key={item._id} allowZeroExpanded >
    <AccordionItem>
        <AccordionItemHeading >
            <AccordionItemButton style={Style[index]}>

            <TrackerItem isDone={userData.vaccines.includes(item._id)}/>
          


            {index+1} - {item.vStartRangeNumber}{" "}{item.vStartRangePost} - {item.vShortName} - {item.vName} 
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <b className="v-accordion-key">Disease Prevented:</b>
          <div className="v-accordion-value">{item.vDiseasePrevented}</div>
          <b className="v-accordion-key">Medium:</b>
          <div className="v-accordion-value">{item.medium}</div>
          <b className="v-accordion-key">Side Effects:</b>
          <div className="v-accordion-value"><ul>
            {item.vSideEffects.map((se)=>
            {return <li key={se}>{se}</li>})}
            </ul></div>
          <b className="v-accordion-key">Description:</b>
          <div className="v-accordion-value text-justify" >{item.vDesc}</div>
          {/* <button className="button btn" onClick={()=>{navigate('/VaccineEditor',{state:{item}})}}>Edit</button> */}
          {
            userData.vaccines.includes(item._id)?
          <button className="button btn2 bRed fWhite" onClick={()=>{removeVCVaccine(item._id,index)}}>Remove</button>
            
            :
          <button className="button btn2 bGreen fWhite" onClick={()=>addVCVaccine(item._id,index)}>Add</button>
          
          }
        </AccordionItemPanel>
    </AccordionItem>
    </Accordion>
);





      
     
    
  })}





</div>

       
    </div>
    </div>
    </div>
    </>
  );
}

export default VCManageVaccines;
