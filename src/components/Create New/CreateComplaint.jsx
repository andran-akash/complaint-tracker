import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useParams, useNavigate } from "react-router-dom";
// import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineMyLocation } from "react-icons/md";
import { emptyTicket } from "../Profile/Constants";

import "./createnew.css";
import TicketsService from "../Api/TicketsService";
import DocumentService from "../Api/DocumentService";
import LocationService from "../Api/LocationService";

// import { MdOutlineClose } from "react-icons/md";
// import Select from "react-select";

export default function CreateComplaint() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesToUpload, setImagesToUpload] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ticket, setTicket] = useState(emptyTicket);
  const [location, setLocation] = useState({ latitude: "", longtitude: "" });
  let { profileId } = useParams();
  const [error, setError] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();
  let mounted = true;
  let mounted2 = true;
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDepartments(mounted);
    return () => (mounted = false);
  }, []);

  // useEffect(() => {
  //   if (mounted2) {
  //     fetchAddress();
  //   }
  //   return () => (mounted2 = false);
  // }, [location]);

  async function fetchDepartments(mounted) {
    if (mounted) {
      await TicketsService.getDepartments(profileId, "departments").then(
        (response) => {
          if (response !== undefined) setDepartmentList(response.fieldValues);
          if (response.error) {
            setError(response.error);
          }
        }
      );
    }
  }

  const handleChange = ({ currentTarget: input }) => {
    setTicket({ ...ticket, [input.name]: input.value });
    console.log(ticket);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedFile = await DocumentService.uploadFile(
      profileId,
      imagesToUpload
    );
    if (uploadedFile) {
      setTicket({ ...ticket, filesBeforeFix: [uploadedFile] });
      const responseData = await TicketsService.createTicket(profileId, {
        ...ticket,
        filesBeforeFix: [...ticket.filesBeforeFix, uploadedFile],
      });
      if (responseData.ticket) {
        navigate(`/i-tracker/users/${profileId}/tickets`);
      } else if (responseData.error) {
        setError(responseData.error.message);
      } else {
        setError("Unknown Error. Pls try after sometime");
      }
    } else {
      setError("File Upload failed");
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

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longtitude: position.coords.longitude,
      });
      await fetchAddress({
        latitude: "" + position.coords.latitude,
        longtitude: "" + position.coords.longitude,
      });
    });
  };

  const fetchAddress = async (locationCoords) => {
    if (
      locationCoords.latitude !== undefined &&
      locationCoords.latitude !== ""
    ) {
      await LocationService.getAddress(locationCoords).then((response) => {
        const pincode =
          response.address_components[response.address_components.length - 1]
            .long_name;
        setLocation({
          ...locationCoords,
          address: response.formatted_address,
          pincode: pincode,
        });
        setTicket({
          ...ticket,
          location: {
            ...locationCoords,
            address: response.formatted_address,
            pincode: pincode,
          },
        });
        console.log({
          ...ticket,
          location: {
            ...locationCoords,
            address: response.formatted_address,
            pincode: pincode,
          },
        });
      });
    }
  };

  return (
    <div className="create-new-main-container">
      <div className="create-new-primary">
        <div className="create-new-heading">Create New</div>
        <div className="create-new-infocontainer">
          <div className="create-new-department-title">
            Complaint Information
          </div>
          <div className="create-new-grid-container">
            <ul className="create-new-row">
              <li className="create-new-list">
                <label className="create-new-lable">Subject</label>
                <input
                  name="subject"
                  onChange={handleChange}
                  required
                  value={ticket.subject}
                  className="create-new-input"
                  maxLength={26}
                />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Department</label>
                <select
                  defaultValue=""
                  name="department"
                  onChange={handleChange}
                  required
                  className="create-new-input"
                >
                  <option value="">--Select Department--</option>
                  {departmentList.map((departmentValue) => {
                    return (
                      <option key={departmentValue} value={departmentValue}>
                        {departmentValue}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Description</label>
                <textarea
                  placeholder="in 150 words"
                  name="description"
                  onChange={handleChange}
                  value={ticket.description}
                  required
                  className="custom-textarea"
                  maxLength={150}
                />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Upload Image</label>
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
              {/* <li className="create-new-list">
                <label className="create-new-lable">Upload Voice</label>
                <button
                  className="create-new-uploadpic"
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
                <button
                  className="create-new-play-button"
                  onClick={playRecording}
                  disabled={recordedChunks.length === 0}
                >
                  Play Recording
                </button>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="create-new-loccontainer">
          <div className="create-new-department-title">
            Location Information
          </div>
          <div className="create-new-grid-container">
            <ul className="create-new-row">
              <li className="create-new-list">
                <label className="create-new-lable">Fault Location</label>
                <button
                  className="create-new-currentloco-button"
                  onClick={getLocation}
                >
                  Current Location
                  <MdOutlineMyLocation
                    style={{
                      paddingTop: "0.5px",
                      fontSize: "20px",
                      marginLeft: "10px",
                    }}
                  />
                </button>
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">pin-code</label>
                <input
                  required
                  className="create-new-input"
                  disabled
                  value={ticket.location.pincode}
                />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Address</label>
                <input
                  required
                  className="create-new-input"
                  disabled
                  value={ticket.location.address}
                />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Proximate Landmark</label>
                <input
                  name="landmark"
                  onChange={(e) => {
                    setTicket({
                      ...ticket,
                      location: {
                        ...ticket.location,
                        landmark: e.target.value,
                      },
                    });
                  }}
                  required
                  className="create-new-input"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="create-new-submit-position">
          <button className="create-new-submit" onClick={handleSubmit}>
            Submit
          </button>
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
}
