import React, { useState } from "react";
import Input from "react-phone-number-input/input";

import "./profile2.css";
import { GrUpdate } from "react-icons/gr";

function EditProfile({
  updateFirstName,
  updateLastName,
  updatePhNumber,
  updateDOB,
  updateAddress,
  updateLandmark,
  updateDistrict,
  updatePincode,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [DOB, setDOB] = useState();
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState();
  console.log(pincode);

  //   const [showComponent, setShowComponent] = useState(false);
  //   const [buttonClicked, setButtonClicked] = useState(false);

  function handleUpdate() {
    updateFirstName(firstName);
    updateLastName(lastName);
    updatePhNumber(phNumber);
    updateDOB(DOB);
    updateAddress(address);
    updateLandmark(landmark);
    updateDistrict(district);
    updatePincode(pincode);
  }

  return (
    <div className="profile-details">
      <div>
        <h6>User Information</h6>
        <div className="profile-margin">
          <div className="row">
            <div className="profile-coloum">
              <ul className="Grid-effect">
                <li>
                  <div className="list-div">
                    <label className="profile-label">First Name</label>
                    <input
                      className="text-input"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Last Name</label>
                  <input
                    className="text-input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLasttName(e.target.value)}
                  />
                </li>
                <li>
                  <div className="list-div">
                    <label className="profile-label">Mobile Number</label>
                    <Input
                      country="IN"
                      international
                      withCountryCallingCode
                      className="text-input"
                      maxLength={15}
                      //   type="number"
                      value={phNumber}
                      onChange={setPhNumber}
                      //   onChange={(e) => setPhNumber(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Date of Birth</label>
                  <input
                    className="text-input"
                    type="date"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h6 className="contact-container">Contact Information</h6>
        <div className="profile-margin">
          <div className="row">
            <div className="profile-coloum">
              <ul className="Grid-effect">
                <li>
                  <div className="list-div">
                    <label className="profile-label">Address</label>
                    <input
                      className="text-input"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Landmark</label>
                  <input
                    className="text-input"
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </li>
                <li>
                  <div className="list-div">
                    <label className="profile-label">District</label>
                    <input
                      className="text-input"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Pin-code</label>
                  <input
                    className="text-input"
                    // type="number"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="button-update-position">
          <button className="profile-update" onClick={handleUpdate}>
            Update <GrUpdate style={{ paddingLeft: "4px", fontSize: "19px" }} />
          </button>
        </div>
        {/* <div className="button-edit-position">
            <button className="profile-edit">
              Edit <FiEdit />
            </button>
          </div> */}
      </div>
    </div>
  );
}

export default EditProfile;
