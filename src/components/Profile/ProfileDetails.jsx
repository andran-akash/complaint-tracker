import React, { useState } from "react";
// import EditProfile from "./EditProfile";

import "./profile2.css";
// import { HiOutlineLogout } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
// import { GrUpdate } from "react-icons/gr";

//profile 1 css
// import "./profile.css";
import defaultAvatar from "./man.png";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-phone-number-input/style.css";

export default function ProfileDetails({
  firstName,
  lastName,
  phNumber,
  DOB,
  address,
  landmark,
  district,
  pincode,
  onClick,
}) {
  const [image, setImage] = useState(null);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="profile-pic">
        <div className="profile-pic-container">
          <div class="container">
            <div class="gradient"></div>
            <div class="content"></div>
            <div className="avatar-container-main">
              <div className="avatar-container">
                <img
                  src={image ? image : defaultAvatar} // Use uploaded image or default avatar
                  alt="Profile Avatar"
                  className="avatar"
                />
                {!image && <div className="avatar-overlay"></div>}
                {/* Display upload text if no image */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>
          <div className="profile-information">
            <div>
              Name : {firstName} {lastName}
            </div>
            <div>Email: andranakash@gamil.com</div>
            <div>DOB : {DOB} </div>
            <div>Mobile Number : {phNumber}</div>
            <div className="profile-address">
              Address : {address} {landmark} {district} - {pincode}
            </div>
            <div>Pin Code : {pincode}</div>
          </div>
          <div className="button-edit-position">
            <button className="profile-edit" onClick={onClick}>
              Edit <FiEdit style={{ paddingLeft: "5px", fontSize: "19px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
