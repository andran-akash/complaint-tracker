import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "./Image6.jpg";
import "./currentcomplaint.css";

import { RiDeleteBinLine } from "react-icons/ri";

function ComplaintCard({ ticket, accessList }) {
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();
  let { profileId } = useParams();

  return (
    <div className="home-top-container">
      <img className="card-image" src={Image} alt="Logo" />
      <div className="card-text-container">
        ID :<div className="card-text-deatils">{ticket.id}</div>
      </div>
      <div className="card-text-container">
        Subject :<div className="card-text-deatils">{ticket.subject}</div>
      </div>
      <div className="card-text-container">
        Created Date :
        <div className="card-text-deatils">{ticket.createdDt}</div>
      </div>
      <div className="card-text-container">
        Status : <div className="card-text-deatils">{ticket.status}</div>
      </div>
      <div className="card-text-container">Pin-Code : </div>
      <div className="button-div">
        {accessList !== undefined &&
          accessList.map((access) => {
            return (
              access.accessName === "ticket" &&
              access.accessTarget === "ticket" && (
                <button
                  className="button-delete"
                  onClick={() => {
                    navigate(
                      `../i-tracker/users/${profileId}/tickets/${ticket.id}/${access.accessLevel}`
                    );
                  }}
                >
                  {access.accessLevel}
                </button>
              )
            );
          })}
        {/* <div>
          <button className="button-delete">
            Delete <RiDeleteBinLine />
          </button>
        </div>
        <div className="tab-actions">
          <button onClick={() => setShowDetails((h) => !h)}>
            {showDetails ? "Hide" : "Show"} details
          </button>
        </div> */}
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

export default ComplaintCard;
