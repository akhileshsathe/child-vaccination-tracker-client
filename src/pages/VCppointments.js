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
import { Logout } from "../functions/Logout";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

function VCppointments() {
  let { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [Vaccines, setVaccines] = useState();
  const [userData, setUserData] = useState("");
  const [appointments, setAppointments] = useState("");

  const [Style, setStyle] = useState("");
  const [values, setValues] = useState({
    Email: localStorage.getItem("Email"),
  });
  const cancelAppointment = (pid, cid, vid) => {
    if (!window.confirm("Do you want to proceed?")) return false;

    fetch("/cancelAppointment", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ pid: pid, cid: cid, vid: vid }),
    }).then((res) => {
      if (res.status === 200) {
        notifyToast("Appointment Cancelled", "success");
      }

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };

  const completeAppointment = (pid, cid, vid) => {
    if (!window.confirm("Do you want to proceed?")) return false;

    fetch("/completeAppointment", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ pid: pid, cid: cid, vid: vid }),
    }).then((res) => {
      if (res.status === 201) {
        notifyToast("Appointment Cancelled", "success");
      }

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };

  const completeAppointment2 = (apid) => {
    if (!window.confirm("Do you want to proceed?")) return false;

    fetch("/completeAppointment", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ apid }),
    }).then((res) => {
      if (res.status === 201) {
        notifyToast("Appointment Completed", "success");
      }
   

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };

  // const pageParentHome = () => {
  //   fetch("/ParentHome", {
  //     method: "get",
  //     headers: {
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }).then((res) => {
  //     if (res.status === 201) {
  //       res.json().then((json) => {
          
  //         console.log(json);
  //         localStorage.setItem("Email", json.Email);

  //         dispatch({ type: "USER", payload: false });
  //       });
  //     }
  //     if (res.status === 401) {
  //       localStorage.setItem("userType", "UNKNOWN");
  //       Logout();
  //       navigate("/login");
  //     }

  //     //   response  .then(res => res.json())
  //     //   .then(json => console.log(json))
  //   });
  // };
  const VCGetAppointments = () => {
    //console.log(userData._id+"___+__+__+_+__+_+__+___+__+_+_+_")
    fetch("/AppointmentsVC", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ vcid: userData._id }),
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          console.log(json);
          setUserData(json.user);
          setAppointments(json.appointments);

          setLoading(false);

          // initialiseStyles(appointments);
        });
      }
      if (res.status === 400) {
        console.log("----");
        res.json().then((json) => {
          json.error.forEach((error) => {
            notifyToast(error.msg);
          });
        });
      }
    });
  };

  // const initialiseStyles = (appointments) => {
  //   //if(!appointments)return false;
  //   appointments.forEach((item, index) => {
  //     if (item.aStatus == "p") {
  //       setStyle({ ...Style, [index]: { background: "grey", color: "white" } });
  //     }
  //     if (item.aStatus == "d") {
  //       setStyle({ ...Style, [index]: {} });
  //     }
  //     if (item.aStatus == "a") {
  //       setStyle({ ...Style, [index]: {} });
  //     }
  //   });
  // };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType != "v") {
      switch (userType) {
        case "a":
          notifyToast("Unauthorised", "error");
          navigate("/adminDash");
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
    // pageParentHome();

    VCGetAppointments();
    
  },[]);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    //console.log(values);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="ManageVaccine-container ">
        <div className="Nbackground ">
          <div className="belowNav ">
            <div className="vMgmntActions Margin5">
              <h1>
                Todays Appointments <br />
              </h1>

              <div className="Note">
                --Appointments--
                <br />
                <table className="top">
                  <tbody>
                    <tr>
                      <td className="bGreen fWhite gol">Green</td>
                      <td>-Vaccinated</td>
                    </tr>
                    <tr>
                      <td className="bPurple fWhite gol">Purple</td>
                      <td>-Appointment scheduled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="vaccine-list Margin5">
              {appointments.map((item, index) => {
                return (
                  <Accordion key={item._id} allowZeroExpanded>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton style={Style[index]}>
                          {/* {index+1} - */}
                          <TrackerItem isDone={item.aStatus} />{" "}
                          {

item.aStatus=='a'?"Appointment Booked - ":
item.aStatus=='d'?"Completed - ":
item.aStatus=='p'?"Pedning - ":
item.aStatus=='c'?"Appointment Canceled - ":" - "
            }
                          {item.timeslot}
                          {" - "} Child Name:
                          {item.cName} {" - Parent Email:"} {item.parentEmail}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        {/* { JSON.stringify(item)} */}
                        Vaccine Name:{item.vName}
                        <br />
                        Time Slot:{item.timeslot}
                        <br />
                        {item.aStatus == "a" ? (
                          <div>
                            <button
                              className="button btn2 bGrey fWhite"
                              onClick={() =>
                                cancelAppointment(item.pid, item.cid, item.vid)
                              }
                            >
                              Cancel appointment?
                            </button>

                            <button
                              className="button btn2 bGreen fWhite"
                              onClick={() => {
                                completeAppointment(item.pid, item.cid, item.vid)
                               
                              }}
                            >
                              Vaccinate{" >>"}
                            </button>
                          </div>
                        ) : item.aStatus == "d" ? (

                        <div className="btn bGrey fGreen">Completed</div>
                          
                        ) : (
                          ""
                        )}
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

export default VCppointments;
