import React from "react";
import { useState } from "react";
import Image from "./Image6.jpg";
import "./currentcomplaint.css";

import { RiDeleteBinLine } from "react-icons/ri";

function CurrentComplaint() {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="home-top-container">
      <img className="card-image" src={Image} alt="Logo" />
      <div>ID : </div>
      <div>Location : </div>
      <div>Date : </div>
      <div>Status : </div>
      <div>Content : </div>
      <div className="button-div">
        <div>
          <button className="button-delete">
            Delete <RiDeleteBinLine />
          </button>
        </div>
        <div className="tab-actions">
          <button onClick={() => setShowDetails((h) => !h)}>
            {showDetails ? "Hide" : "Show"} details
          </button>
        </div>
      </div>
    </div>

    // <div className="home-main-container1">
    //   <CardElement />
    // </div>

    // <div className="home-main-container1">
    // <div className="home-top-container">top</div>
    // </div>
  );
}

export default CurrentComplaint;
