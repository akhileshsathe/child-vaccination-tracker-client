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
import VaccineEditor from "../components/VaccineEditor";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

function AManageVC() {
  let { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [VC, setVC] = useState();

  const [values, setValues] = useState({
    Email: localStorage.getItem("Email"),
    
  });

  const getVaccines = () => {
    fetch("/adminGetVC", {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          setVC(json.VC);
          setLoading(false);

          dispatch({ type: "USER", payload: false });
        });
      }

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType != "a") {
      switch (userType) {
        case "v":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "p":
          notifyToast("Unauthorised", "error");
          navigate("/parentHome");
          break;
        default:
          notifyToast("Login First", "error");
          localStorage.setItem("userType", "UNKNOWN");
          navigate("/login");
          break;
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

  const VCManager = (_id,userType) => {
    const response = fetch("/ManageVC", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        userType
      }),
    });
    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Action successful", "success");
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
        <div className="belowNav ">
          <div className="vMgmntActions Margin5">
            <h1>
              Manage Vaccination Centers <br />
            </h1>

            <div className="Note">
              *Collapse each Vaccination Center tab to show details and edit and remove
              functions
            </div>
          </div>

          <div className="vaccine-list Margin5">

            {VC.map((item, index) => {
              return (



                
                <Accordion key={item._id} allowZeroExpanded>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        {index + 1} - {item.vcName} -{" "}
                        {item.userType == "v"
                          ? "approved"
                          : item.userType == "vu"
                          ? "New Registraion"
                          : item.userType == "vr"
                          ? "Rejected"
                          : item.userType == "vu"
                          ? "Reapplied"
                          : ""}{" "}
                        - {item.vcOwnerName}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <b className="v-accordion-key">Address</b>
                      <div className="v-accordion-value text-justify">



                        <p>{item.address.map((address)=>{return(<p>

                          House No:{address.addrHouseNo},
                          Locality:{address.addrLocality},
                          Road:{address.addrRoad},
                          City:{address.addrCity},
                          Taluka:{address.addrTaluka},
                          District:{address.addrDistrict},
                          State:{address.addrState},
                          Country:{address.addrCountry},
                          Pin Code{address.addrPinCode},
                        </p>)})}</p>
                      </div>

                      <b className="v-accordion-key">Vaccines Available:</b>
                      <div className="v-accordion-value">
                        <ul>
                          {item.vaccines.map((se) => {
                            return <li key={se}>{se}</li>;
                          })}
                        </ul>
                      </div>
                      
                      <button
                        className="button btn2 bGreen fWhite"
                        onClick={() =>
                          VCManager(item._id,"v")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="button btn2 bGrey fWhite"
                        onClick={() => {
                          VCManager(item._id,"vr");
                        }}
                      >
                        Disapprove
                      </button>
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

export default AManageVC;
