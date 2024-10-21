import React from "react";

const TrackerItem = ({ isDone }) => {
  return (
    <div className="tracker-col">
      <div className="tracker-row">

      {
isDone=='a'?(<span className="material-symbols-outlined fPurple">event</span>):
isDone=='d'?(<span className="material-symbols-outlined fGreen">check_circle</span>):
isDone=='p'?"Pending":
isDone=='c'?"Appointment Canceled":

isDone==false?(<span className="material-symbols-outlined fRed">cancel</span>):
isDone==true?(<span className="material-symbols-outlined fGreen">check_circle</span>):""

      }
      </div>
    </div>
  );
};
export default TrackerItem;
