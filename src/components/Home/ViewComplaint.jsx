import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketsService from "../Api/TicketsService.js";
import DocumentService from "../Api/DocumentService.js";
import { emptyTicket } from "../Profile/Constants";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

import "./viewcomplaint.css";

function ViewComplaint() {
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [filesBeforeFix, setFilesBeforeFix] = useState([]);
  const [filesAfterFix, setFilesAfterFix] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleDiv = () => {
    setShowFirstDiv(!showFirstDiv);
  };

  const [ticket, setTicket] = useState(emptyTicket);
  let { profileId, ticketId } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let mounted = true;

  useEffect(() => {
    fetchData(mounted);
    console.log(filesBeforeFix);
    return () => (mounted = false);
  }, []);

  async function fetchData(mounted) {
    if (mounted) {
      await TicketsService.getTicketById(profileId, ticketId).then(
        (response) => {
          if (response.tickets !== undefined) {
            setTicket(response.ticket);
            if (
              response.ticket.filesBeforeFix !== undefined &&
              response.ticket.filesBeforeFix !== null
            ) {
              response.ticket.filesBeforeFix.map(async (fileBeforeFix) => {
                await downloadFile(fileBeforeFix);
              });
            }
            if (
              response.ticket.filesAfterFix !== undefined &&
              response.ticket.filesAfterFix !== null
            ) {
              response.ticket.filesAfterFix.map(async (filesAfterFix) => {
                await downloadAfterFixFile(filesAfterFix);
              });
            }
          }
          if (response.error) {
            setError(response.error);
          }
        }
      );
    }
  }

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

  const downloadAfterFixFile = async (fileAfterFix) => {
    setLoading(true);
    await DocumentService.downloadFile(profileId, fileAfterFix).then(
      (response) => {
        if (response.error) {
          setError(response.error);
        } else {
          const reader2 = new FileReader();
          reader2.onload = () => {
            setFilesAfterFix([...filesAfterFix, reader2.result]);
            console.log(response);
          };
          reader2.readAsDataURL(response);
          // URL.createObjectURL(response);
        }
      }
    );
    setLoading(false);
  };

  return (
    <>
      <div className="viewc-main-container">
        <div className="viewc-primarycontainer">
          <div className="viewc-secondarycontainer">
            <div className="viewc-header">View Complaint</div>
            <div className="viewc-imagecontainer">
              {showFirstDiv ? (
                <div className="viewc-image-secondarycontainer">
                  <div className="viewc-imagetitle">Complaint Image</div>
                  {loading && <LoadingSpinner />}
                  <img
                    className="viewc-image"
                    src={filesBeforeFix[0]}
                    alt="viewimage"
                  />
                </div>
              ) : (
                <div className="viewc-image-secondarycontainer">
                  <div className="viewc-imagetitle">Resolved Image</div>
                  {loading && <LoadingSpinner />}
                  <img
                    className="viewc-image"
                    src={filesAfterFix[0]}
                    alt="viewimage"
                  />
                </div>
              )}
              {filesAfterFix[0] !== undefined && (
                <button className="viewc-switch-button" onClick={toggleDiv}>
                  {showFirstDiv
                    ? "View Resolved Image"
                    : "view Complaint Image"}
                </button>
              )}
            </div>
            <div className="viewc-details-container">
              <div className="viewc-details-container-title">
                Complaint Information
              </div>
              <ul className="viewc-grid-container-first">
                <li>
                  <div className="viewc-subject">
                    Subject:
                    <div className="viewc-user-subject">{ticket.subject}</div>
                  </div>
                </li>
                {error && <div className="viewc-error">{error}</div>}
                <li>
                  <div className="viewc-department">
                    Department:
                    <div className="viewc-user-department">
                      {ticket.department}
                    </div>
                  </div>
                </li>
              </ul>
              <div className="viewc-description">
                Description:
                <div className="viewc-user-description">
                  {ticket.description}
                </div>
              </div>
              <ul className="viewc-grid-container-second">
                <li>
                  <div className="viewc-status">
                    Status:
                    <div className="viewc-user-status">{ticket.status}</div>
                  </div>
                </li>
                <li>
                  <li>
                    <div className="viewc-createddate">
                      Created Date:
                      <div className="viewc-user-createddate">
                        {ticket.createdDt}
                      </div>
                    </div>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewComplaint;
