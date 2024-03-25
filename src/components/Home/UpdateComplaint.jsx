import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineMyLocation } from "react-icons/md";

import TicketsService from "../Api/TicketsService.js";
import DocumentService from "../Api/DocumentService";
import { emptyTicket } from "../Profile/Constants.js";
import "./updatecomplaint.css";

function UpdateComplaint({ user }) {
  const [accessList, setAccessList] = useState([]);
  const [ticket, setTicket] = useState(emptyTicket);
  const [departmentList, setDepartmentList] = useState([]);
  const [officerList, setOfficerList] = useState([]);
  const [assignedOfficer, setAssignedOfficer] = useState();
  // upload
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesToUpload, setImagesToUpload] = useState(null);
  const fileInputRef = useRef(null);

  let { profileId, ticketId } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let mounted = true;

  useEffect(() => {
    fetchTicket(mounted);
    fetchDepartments(mounted);
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    fetchAssignedOfficerDetails(profileId);
    return () => (mounted = false);
  }, [ticket]);

  async function fetchTicket(mounted) {
    if (mounted) {
      await TicketsService.getTicketById(profileId, ticketId).then(
        (response) => {
          if (response.tickets !== undefined) {
            setTicket(response.ticket);
            setAccessList(response.access.accessList);
          }
          if (response.error) {
            setError(response.error);
          }
        }
      );
    }
  }

  async function fetchDepartments(mounted) {
    if (mounted) {
      await TicketsService.getUsersByDepartments(profileId).then((response) => {
        if (response !== undefined) {
          setDepartmentList(response);
        }
        if (response.error) {
          setError(response.error);
        }
      });
    }
  }

  const fetchAssignedOfficerDetails = async (profileId) => {
    if (
      ticket !== undefined &&
      ticket.assignedTo !== undefined &&
      ticket.assignedTo !== ""
    ) {
      await TicketsService.getProfileById(ticket.assignedTo, profileId).then(
        (response) => {
          if (response !== undefined) {
            setAssignedOfficer(response);
          }
          if (response.error) {
            setError(response.error);
          }
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ticketToSave = ticket;
    if (imagesToUpload !== undefined && imagesToUpload !== null) {
      const uploadedFile = await DocumentService.uploadFile(
        profileId,
        imagesToUpload
      );
      if (uploadedFile) {
        ticketToSave = { ...ticket, filesAfterFix: [uploadedFile] };
      } else {
        setError("File Upload failed");
      }
    }
    await TicketsService.updateTicket(profileId, ticketId, ticketToSave).then(
      (response) => {
        if (response.tickets !== undefined) {
          navigate(`/i-tracker/users/${profileId}/tickets`);
        }
        if (response.error) {
          setError(response.error);
        }
      }
    );
  };

  const handleDepartmentEvent = async ({ currentTarget: input }) => {
    let officer = departmentList.find(({ name }) => name === input.value);
    if (officer !== undefined && officer.user !== undefined) {
      setOfficerList(officer.user);
    } else {
      setOfficerList(undefined);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setImagesToUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  function UploadPic() {
    fileInputRef.current.click();
  }
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="update-admin-main-container">
      <div className="update-admin-primary-container">
        <div className="update-admin-title">Update Complaint</div>
        <ul className="update-admin-row">
          <li className="update-admin-li">
            <div className="update-admin-subject">Subject:</div>
            <div className="update-admin-subjectcontent">{ticket.subject}</div>
          </li>
          <li className="update-admin-li">
            <div className="update-admin-description">Description:</div>
            <div className="update-admin-subjectcontent">
              {ticket.description}
            </div>
          </li>
          {error && <div>{error}</div>}
          <li className="update-admin-li">
            <div className="update-admin-department">Department:</div>
            <div className="update-admin-subjectcontent">
              {ticket.department}
            </div>
          </li>
          <li className="update-admin-li">
            <div className="update-admin-createdDt">Created Date:</div>
            <div className="update-admin-subjectcontent">
              {ticket.createdDt}
            </div>
          </li>
          {user.role === "public" && <div>Status: {ticket.status}</div>}
          {user.role === "admin" && assignedOfficer !== undefined && (
            <li className="update-admin-li">
              <div className="update-admin-department">
                Curently Assigned To:
              </div>
              <div className="update-admin-subjectcontent">
                {assignedOfficer.firstName} {assignedOfficer.lastName}
              </div>
            </li>
          )}
          {(user.role === "admin" || user.role === "officer") && (
            <li className="update-admin-input-cell">
              <div className="update-admin-option">Status</div>
              <select
                className="update-admin-new-input"
                labelId="ticket-status"
                name="status"
                value={ticket.status}
                onChange={(e) => {
                  setTicket({ ...ticket, status: e.target.value });
                }}
              >
                <option value="Open">OPEN</option>
                <option value="Queued">QUEUED</option>
                <option value="Progressing">PROGRESSING</option>
                <option value="Resolved">RESOLVED</option>
              </select>
            </li>
          )}
          <li className="update-admin-input-cell">
            <div className="update-admin-option">Upload Image</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the file input
            />
            <button className="create-new-uploadpic" onClick={UploadPic}>
              Choose Image
            </button>
            <div>
              {/* <img
                    src={selectedImage}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  /> */}
            </div>
            <button
              className="create-new-preview-button"
              onClick={handleOpenModal}
            >
              Preview
            </button>
            <Modal
              className="create-new-model"
              isOpen={isOpen}
              onRequestClose={handleCloseModal}
              contentLabel="Image Modal"
            >
              <div className="create-new-modal-container">
                <button
                  className="create-new-close-model-button"
                  onClick={handleCloseModal}
                >
                  <AiOutlineCloseCircle
                    style={{
                      paddingRight: "3px",
                      paddingTop: "1px",
                      fontSize: "29px",
                    }}
                  />
                  Close
                  {/* <MdOutlineClose
                        style={{ paddingTop: "7px", fontSize: "25px" }}
                      /> */}
                </button>
                <img
                  className="create-new-modal-image"
                  src={selectedImage}
                  alt="Image1"
                />
              </div>
            </Modal>
          </li>
          {user.role === "admin" && (
            <>
              <li className="update-admin-input-cell">
                <div className="update-admin-option">Department</div>
                <select
                  className="update-admin-new-input"
                  defaultValue=""
                  name="department"
                  onChange={handleDepartmentEvent}
                  required
                >
                  <option value="">--Select Department--</option>
                  {departmentList.map((department) => {
                    return (
                      <option key={department.name} value={department.name}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
              </li>
              {officerList !== undefined && officerList.length > 0 && (
                <li className="update-admin-input-cell">
                  <div className="update-admin-option">Officer</div>
                  <select
                    defaultValue=""
                    name="assignedTo"
                    onChange={(e) => {
                      setTicket({ ...ticket, assignedTo: e.target.value });
                    }}
                    required
                    className="update-admin-new-input"
                  >
                    <option value="">--Select Officer--</option>
                    {officerList !== undefined &&
                      officerList.map((officer) => {
                        return (
                          <option
                            key={officer.profileId}
                            value={officer.profileId}
                          >
                            {officer.firstName} {officer.lastName}
                          </option>
                        );
                      })}
                  </select>
                </li>
              )}
            </>
          )}
        </ul>
        {(user.role === "admin" || user.role === "officer") && (
          // <li className="update-admin-button-cell">
          <div className="update-adminbuttondiv">
            <button
              className="update-admin-button"
              type="submit"
              onClick={handleSubmit}
            >
              Update Ticket
            </button>
          </div>
          // </li>
        )}
      </div>
    </div>
  );
}

export default UpdateComplaint;
