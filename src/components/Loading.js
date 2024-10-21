// import { json } from "react-router-dom";
import loading from "../images/loading.gif"


const NavBar = () => {
  return (
    <div className="Loading-Container">
        <div  className="loading-animation ">
        <img src={loading} />
        
        </div>
        <div className="loading-text">Loading,Please Wait...</div>
    </div>
  );
};
export default NavBar;

