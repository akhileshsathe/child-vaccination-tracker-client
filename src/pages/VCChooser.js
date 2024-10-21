import { useState, useEffect, useContext } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";

import { useLocation } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

function VCChooser() {
  const { state } = useLocation();
  const [userData, setUserData] = useState(state.userData);
  const [timeslot, setTimeSlot] = useState("000");
  const [vDate, setVDate] = useState();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [VC, setVC] = useState();

  const validate = (item) => {
    if (!vDate) {
      notifyToast("Select a Date", "error");
      return false;
    } else if (timeslot == "000") {
      notifyToast("Select a timeslote", "error");
      return false;
    } else {
      navigate("/BookAppointment", { state: { ...state, vc: item,vid:state.vid,timeslot:timeslot,vDate:vDate } });
    }
  };
  const [values, setValues] = useState({
    Email: localStorage.getItem("Email"),
  });
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  const handleTimeSlot = (e) => {
    setTimeSlot(e.target.value);
    console.log(timeslot);
  };
  const handleVDate = (e) => {
    setVDate(e.target.value);
    console.log(vDate);
  };
  function getCurrentDate() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate() ;
    const year = now.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  function getSevenDaysDate() {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    let month = now.getMonth() + 1;
    let day = now.getDate();
    const year = now.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  const getVaccines = () => {
    const vid = state.vid;

    fetch("/userGetVC", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        vid,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          const distance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Earth's radius in kilometers
            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const lat1Rad = (lat1 * Math.PI) / 180;
            const lat2Rad = (lat2 * Math.PI) / 180;

            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) *
                Math.sin(dLon / 2) *
                Math.cos(lat1Rad) *
                Math.cos(lat2Rad);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            console.log(distance);
            return distance;
          };
          const objectsWithDistances = json.VC.map((obj) => ({
            ...obj,
            distance: distance(
              obj.locationLat,
              obj.locationLon,
              userData.locationLat,
              userData.locationLon
            ),
          }));

          // Sort by distance
          const sortedObjects = objectsWithDistances.sort(
            (a, b) => a.distance - b.distance
          );

          // setVC(json.VC);
          setVC(sortedObjects);
          console.log(sortedObjects);
          setLoading(false);
        });
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

    getVaccines();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="ManageVaccine-container ">
        <div className="Nbackgroun ">
          <div className="belowNav">
            <div className="vMgmntActions Margin5">
              <h1>
                Choose Vaccination Centers <br />
              </h1>

              <div className="Note">
                Collapse each Vaccination Center tab to Make an appointment
              </div>
            </div>

            <div className="vaccine-list Margin5">
              {VC.length == 0 ? (
                <div>No Vaacination Centers Found</div>
              ) : (
                VC.map((item, index) => {
                  return (
                    <Accordion key={item._id} allowZeroExpanded>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            {index + 1} - {item.vcName} - {item.vcOwnerName}{" "}
                            {item.distance}
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <button
                            className="button btn2"
                            onClick={() =>
                              openInNewTab(
                                `http://maps.google.com/maps?q=${item.locationLat},${item.locationLon}`
                              )
                            }
                          >
                            View on maps{">>"}
                          </button>
                          <br />
                          <b className="v-accordion-key">Address</b>
                          <div className="v-accordion-value text-justify">
                            <div>
                              {item.address.map((address) => {
                                return (
                                  <p>
                                    House No:{address.addrHouseNo}
                                    Locality:{address.addrLocality},
                                    <br />
                                    Road:{address.addrRoad}, City:
                                    {address.addrCity},
                                    <br />
                                    Taluka:{address.addrTaluka},
                                    <br />
                                    District:{address.addrDistrict}, State:
                                    {address.addrState},
                                    <br />
                                    Country:{address.addrCountry},
                                    <br />
                                    Pin Code:{address.addrPinCode},
                                  </p>
                                );
                              })}
                            </div>
                          </div>

                          <input
                            type="date"
                            className="btn2"
                            onChange={handleVDate}
                            min={getCurrentDate()}
                            max={getSevenDaysDate()}
                          />
                          <select
                            className="btn2"
                            defaultValue={"--select timeslot--"}
                            onChange={handleTimeSlot}
                          >
                            <option disabled>--select timeslot--</option>
                            {item.timeslots.map((timeslot, index) => {
                              return (
                                <option key={timeslot} value={timeslot}>
                                  {timeslot}
                                </option>
                              );
                            })}
                          </select>

                          <button
                            className="button btn2"
                            onClick={() => validate(item)}
                          >
                            Book Appointment
                          </button>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VCChooser;
