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

function PAppointments() {
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

  const pageParentHome = () => {
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
          console.log(json);
          localStorage.setItem("Email", json.Email);
          setLoading(false);

          dispatch({ type: "USER", payload: false });
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
  };
  const pGetAppointments = () => {
    //console.log(userData._id+"___+__+__+_+__+_+__+___+__+_+_+_")
    fetch("/pGetAppointments", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          setUserData(json.user);
          setAppointments(json.appointments);
          localStorage.setItem("Email", json.user.Email);

          setLoading(false);

          initialiseStyles(json.appointments);
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
  const simpleDate = (date1) => {
    const d = new Date(date1);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  };

  const initialiseStyles = (appointments) => {
    //if(!appointments)return false;
    appointments.forEach((item, index) => {
      if (item.aStatus == "p") {
        setStyle({ ...Style, [index]: { background: "grey", color: "white" } });
      }
      if (item.aStatus == "d") {
        setStyle({ ...Style, [index]: {} });
      }
      if (item.aStatus == "a") {
        setStyle({ ...Style, [index]: {} });
      }
    });
  };

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
          navigate("/vcdash");
          break;
        default:
          notifyToast("Login First", "error");
          localStorage.setItem("userType", "UNKNOWN");
          navigate("/login");
          break;
      }
    }
    // pageParentHome();

    pGetAppointments();
  }, []);

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
                Appointments <br />
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
                    <tr>
                      <td className="bGrey fWhite gol">Purple</td>
                      <td>-Pending</td>
                    </tr>
                  </tbody>
                </table>
                {/* <span className="bGreen fWhite"></span> indicates that the vaccination.
  <br/><span className="bPurple fWhite">Purple</span> indicates that an appointment is scheduled.
  <br/><span className="bGrey fWhite">Grey</span> indicates that vaccination is pending. */}
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
                          {item.aStatus == "a"
                            ? "Appointment Booked - "
                            : item.aStatus == "d"
                            ? "Completed - "
                            : item.aStatus == "p"
                            ? "Pedning - "
                            : item.aStatus == "c"
                            ? "Appointment Canceled - "
                            : " - "}
                          {item.vName}
                          {" - "}
                          {item.cName}
                          {" - "}
                          {item.timeslot}
                          {" - "}
                          {simpleDate(item.vDate)}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        {/* { JSON.stringify(item)} */}
                        <b>Vaccination Name:</b>
                        <br />
                        {item.vName}
                        <br />
                        <b>Timeslot:</b>
                        <br />
                        {item.timeslot}
                        <br />

                        {/* <button className="button btn" onClick={()=>{navigate('/VaccineEditor',{state:{item}})}}>Edit</button> */}
                        {/* {
            userData.vaccines.includes(item._id)?
          <button className="button btn2 bRed fWhite" onClick={()=>{console.log()}}>Remove</button>
            
            :
          <button className="button btn2 bGreen fWhite" onClick={()=>addVCVaccine(item._id,index)}>Add</button>
          
          } */}
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

export default PAppointments;
