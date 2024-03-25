import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocumentService from "../../Api/DocumentService.js";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";

import "./currentcomplaint.css";
import "../../LoadingSpinner/loadingspinner.css";
import Image from "./Image6.jpg";

function ComplaintCard({ ticket, accessList }) {
  const [showDetails, setShowDetails] = useState(true);
  const [filesBeforeFix, setFilesBeforeFix] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { profileId } = useParams();
  const [error, setError] = useState("");
  let mounted = true;

  useEffect(() => {
    if (ticket.filesBeforeFix !== undefined && ticket.filesBeforeFix !== null) {
      ticket.filesBeforeFix.map(async (fileBeforeFix) => {
        await downloadFile(fileBeforeFix);
      });
    }
    return () => (mounted = false);
  }, []);

  const downloadFile = async (fileBeforeFix) => {
    setLoading(true);
    await DocumentService.downloadFile(profileId, fileBeforeFix).then(
      (response) => {
        if (response.error) {
          setError(response.error);
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            setFilesBeforeFix([...filesBeforeFix, reader.result]);
            console.log(response);
          };
          reader.readAsDataURL(response);
          // URL.createObjectURL(response);
        }
      }
    );
    setLoading(false);
  };

  return (
    <div className="home-top-container">
      {loading && <div className="loading-spinner"></div>}
      <img className="card-image" src={filesBeforeFix[0]} alt="Logo" />
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
      <div className="card-text-container">
        Pin-Code : {ticket.location.pincode}
      </div>
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
      </div>
    </div>
  );
}

export default ComplaintCard;
