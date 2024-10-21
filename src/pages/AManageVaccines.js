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

function AManageVaccines() {
  let {state,dispatch}=useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Vaccines, setVaccines] = useState();

  const [values, setValues] = useState({
    
    Email: localStorage.getItem("Email"),
    address: "",
    childName: "",
    childDOB: "",
    childGender: "",

  });


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

  useEffect(() => {

    const userType=localStorage.getItem("userType");
    if(userType!="a"){
      switch(userType){

                    
        case "v":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break;
        case "p":   notifyToast("Unauthorised", "error");
                    navigate("/parentHome");
                    break;
      default:    notifyToast("Login First", "error");
                    localStorage.setItem("userType","UNKNOWN")
                    navigate("/login");
                    break
        }
    }

    getVaccines();
  }, []);

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
     
    });
  };

  const removeVaccine = (_id) => {
    


    const response = fetch("/removeVaccine", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Vaccine removed successfully","success");
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
<div className="belowNav ">
<div className="vMgmntActions Margin5">
<h1>Manage Vaccines <br/></h1>
  <button className="button btn" onClick={()=>{navigate('/VaccineEditor',{state:null})}}>Add a Vaccine</button>
  
  <div className="Note">*Collapse each vaccine tab to show details and edit and remove functions</div>
</div>


        <div className="vaccine-list Margin5">

        {Vaccines.map((item,index) => {
            return (
              
          <Accordion key={item._id} allowZeroExpanded >
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    {index} - {item.vStartRangeNumber}{" "}{item.vStartRangePost} - {item.vShortName} - {item.vName} 
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
                  <button className="button btn" onClick={()=>navigate("/VaccineEditor", { state: { item } })}>Edit</button>
        
                  <button className="button btn" onClick={()=>{removeVaccine(item._id)}}>Remove</button>
                </AccordionItemPanel>
            </AccordionItem>
            </Accordion>
);





              
             
            
          })}





        </div>
       
    </div>
    </div>
    </>
  );
}

export default AManageVaccines;
