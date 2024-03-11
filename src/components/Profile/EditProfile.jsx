import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Input from "react-phone-number-input/input";
import { GrUpdate } from "react-icons/gr";

import "./profile2.css";
import TicketsService from "../Api/TicketsService";

function EditProfile({ user, setUser }) {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [error, setError] = useState("");
  let { profileId } = useParams();

  const handleChange = ({ currentTarget: input }) => {
    if (input.name.includes("residentialAddress.")) {
      var inputName = input.name.replace("residentialAddress.", "");
      setUpdatedUser({
        ...updatedUser,
        residentialAddress: {
          ...updatedUser.residentialAddress,
          [inputName]: input.value,
        },
      });
    } else {
      setUpdatedUser({ ...updatedUser, [input.name]: input.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const responseData = await TicketsService.updateProfileById(
      profileId,
      updatedUser
    );
    if (responseData !== undefined) {
      // navigate(`/i-tracker/users/${profileId}/tickets`);
      setUser(responseData);
    } else if (responseData.message) {
      setError(responseData.error.message);
    } else {
      setError("Unknown Error. Pls try after sometime");
    }
  };

  return (
    <div className="profile-details">
      {error && <div>{error}</div>}
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
                      name="firstName"
                      value={updatedUser.firstName}
                      disabled
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Last Name</label>
                  <input
                    className="text-input"
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName}
                    disabled
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <div className="list-div">
                    <label className="profile-label">Mobile Number</label>
                    <input
                      // country="IN"
                      // international
                      // withCountryCallingCode
                      className="text-input"
                      maxLength={15}
                      //   type="number"
                      name="phNumber"
                      value={updatedUser.phNumber}
                      onChange={handleChange}
                      //   onChange={(e) => setPhNumber(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Date of Birth</label>
                  <input
                    className="text-input"
                    name="dob"
                    value={updatedUser.dob}
                    disabled
                    onChange={handleChange}
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
                      maxLength={35}
                      placeholder="35 Letters in words"
                      type="text"
                      value={
                        updatedUser.residentialAddress === null
                          ? ""
                          : updatedUser.residentialAddress.address
                      }
                      name="residentialAddress.address"
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Landmark</label>
                  <input
                    className="text-input"
                    type="text"
                    name="residentialAddress.landmark"
                    value={
                      updatedUser.residentialAddress === null
                        ? ""
                        : updatedUser.residentialAddress.landmark
                    }
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <div className="list-div">
                    <label className="profile-label">District</label>
                    <input
                      className="text-input"
                      type="text"
                      name="residentialAddress.district"
                      value={
                        updatedUser.residentialAddress === null
                          ? ""
                          : updatedUser.residentialAddress.district
                      }
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li>
                  <label className="profile-label">Pin-code</label>
                  <input
                    maxLength={6}
                    className="text-input"
                    // type="number"
                    name="residentialAddress.pincode"
                    value={
                      updatedUser.residentialAddress === null
                        ? ""
                        : updatedUser.residentialAddress.pincode
                    }
                    onChange={handleChange}
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
