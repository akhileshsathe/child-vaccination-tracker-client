


import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
export const Logout = () => {
  localStorage.setItem("userType","UNKNOWN")

    const response = fetch("/logout", {
        method: "POST",
  
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        "credentials":"include",
        },

      });
      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
      response.then((res) => {
        console.log("HHDHDHDH");
        switch (res.status) {
          case 201: {
            return 201
          }
          case 500: {
            notifyToast("There was some problem");
            break;
          }
          default:
            break;
        }
    })


};