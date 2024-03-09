import React, { useEffect, useRef, useState } from "react";
import "./createnew.css";
import Modal from "react-modal";
// import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineMyLocation } from "react-icons/md";

// import { MdOutlineClose } from "react-icons/md";
// import Select from "react-select";

export default function CreateNew() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
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
                <input required className="create-new-input" />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Department</label>
                <select required className="create-new-input">
                  <option value="">--Select Department--</option>
                  <option className="option" value="Water Department">
                    Water Department
                  </option>
                  <option value="Road Department">Road Department</option>
                </select>
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Description</label>
                <textarea
                  placeholder="in 150 words"
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
                      />{" "}
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
                <button className="create-new-currentloco-button">
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
                <input required className="create-new-input" disabled />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Address</label>
                <input required className="create-new-input" />
              </li>
              <li className="create-new-list">
                <label className="create-new-lable">Proximate Landmark</label>
                <input required className="create-new-input" />
              </li>
            </ul>
          </div>
        </div>
        <div className="create-new-submit-position">
          <button className="create-new-submit">Submit</button>
        </div>
      </div>
    </div>
  );
}
