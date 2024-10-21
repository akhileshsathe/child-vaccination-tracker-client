import { useState, useEffect,useContext } from "react";

import NavBar from "../components/NavBar";
import TrackerItem from "../components/TrackItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";
import { UserContext } from "../App";
import { Logout } from "../functions/Logout";
 
function AdminDash() {
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
  const [reports,setReports]=useState({report:{}});

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

  const pageAdminDash = () => {
    fetch("/adminDash", {
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
          dispatch({type:"USER",payload:false})

        });
        
      }
      if (res.status === 401) {
        localStorage.setItem("userType", "UNKNOWN");

         Logout();
         navigate('/login')
      }

      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };

  const getReports = () => {
    fetch("/adminReport", {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          setReports(json);
          
          setLoading(false);

        });
        
      }
      if (res.status === 401) {
        localStorage.setItem("userType", "UNKNOWN");

         Logout();
         navigate('/login')
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
                    navigate("/ParentHome");
                    break;
        default:    notifyToast("Login First", "error");
                    localStorage.setItem("userType","UNKNOWN")
                    navigate("/login");
                    break
        }
    }

    pageAdminDash();
    getReports();
  }, []);

  if (loading) {
    return <Loading/>;
  }
//   const x = searchChild(userData.children, selectValue) || userData.children[0];
  return (
    <div>
      <div className="Parentcontainer">
        {/* <NavBar className="topnavbar" /> */}

        <div className="belowNav">


        <table className="timeslot-table">

          <tbody>
          
          <tr >
          <th colSpan={2}>User Count Report</th>
          </tr>
          <tr>
              <th>User Class</th>
              <th>User Count</th>
            </tr>
            <tr>
              <td>Admin Count</td>
              <td>{reports.report.adminCount}</td>
            </tr>
            <tr>
              <td>Parent Count</td>
              <td>{reports.report.pCount}</td>
            </tr>
            
            <tr>
              <td>Vaccination Centers Count</td>
              <td>{reports.report.vcCount}</td>
            </tr>

          </tbody>
        </table> 
        <table className="timeslot-table">
  <tbody>
    <tr>
      <th colSpan={2}>Popular Vaccination Count</th>
    </tr>
    {Object.entries(reports.report.vaccineCount).map(([vaccine, count]) => (
      <tr>
        <td>{vaccine}</td>
        <td>{count}</td>
      </tr>
    ))}
  </tbody>
</table>

        


      </div>  
      </div>
    </div>
  );
}

export default AdminDash;
