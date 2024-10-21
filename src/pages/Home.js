import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import logo from "../logo.png"; 

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userType=localStorage.getItem("userType");
    
      switch(userType){

        case "v":   notifyToast("Unauthorised", "error");
                    navigate("/vcdash");
                    break;            
        case "p":   notifyToast("Unauthorised", "error");
                    navigate("/parentHome");
                    break;
        case "a":   notifyToast("Unauthorised", "error");
                    navigate("/AdminDash");
                    break;
        default:    
                    break
        }
    
 
  }, []);
  return (
    <div className="home-container auth-background fWhite">
      <div className="top">
        <div className="top-item logo">
      <img
        src={logo}
        className=" logo-large "
        alt="Child Vaccination Tracker"
      />
      </div>
        <div className="top-item">
        <p>Already have an account?</p>
        
        <input
          type="button"
          className="btn btn-shadow"
          value="Login >>"
          onClick={() => {
            navigate("/login");
          }}
        />
        </div>
        </div>
        <div className="empty-col"><h1>Child Vaccination Tracker</h1>
        <div className="empty-row-by-2"></div>
        </div>
        <div className="home-division">
          <div className="left">
            <div>
              <h2>Parent's Registration</h2>
              <p>
                Welcome to Child Vaccination Tracker.
                
                Timely vaccinations are neccessary for every child's health.
                
                CVT lets you track your child's vaccine.
              
                Ensure your child's vaccines are administered at the correct
             
                Register now!
              </p>
              <br/>
              <input
                type="button"
                className="btn btn-shadow"
                value="Register Now >>"
                onClick={() => {
                  navigate("/signup");
                }}
              />
            </div>
          </div>

          <div className="right">
            <div>
              <h2>Vaccination Center's Registration </h2>
              <p>
                Welcome to Child Vaccination Tracker.
                
                Timely vaccinations are neccessary for every child's health.
                
                CVT lets you track your child's vaccine.
             
                Ensure your child's vaccines are administered at the correct
                time.
             
                Register now!
              </p>
              <br/>
              <input
                type="button"
                className="btn wraap btn-shadow"
                value="Register Now >>"
                onClick={() => {
                  navigate("/VCReg");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Home;
