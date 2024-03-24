import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

import ProfileDetails from "./ProfileDetails";
import EditProfile from "./EditProfile";
import "./profile2.css";
import AuthenticationService from "../Api/AuthenticationService";
import { emptyUser } from "./Constants";
import TicketsService from "../Api/TicketsService";

// import { FiEdit } from "react-icons/fi";
// import { GrUpdate } from "react-icons/gr";

//profile 1 css
// import "./profile.css";
// import defaultAvatar from "./man.png";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-phone-number-input/style.css";

export default function Profile({ user, setLoggedIn, setUser }) {
  const [loading, setLoading] = useState(false);
  // const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);
  let { profileId } = useParams();
  let mounted = true;

  useEffect(() => {
    fetchData(mounted);
    return () => (mounted = false);
  }, []);

  async function fetchData(mounted) {
    if (mounted) {
      await TicketsService.getProfileById(profileId, profileId).then(
        (response) => {
          if (response !== undefined) {
            setUser(response);
          }
        }
      );
    }
  }

  const handleLogout = () => {
    setLoggedIn(AuthenticationService.logout());
    setUser(emptyUser);
    navigate(`/i-tracker/login`);
  };

  function handleClick() {
    setShowComponent(true);
  }

  return (
    <div className="main-container">
      <div className="profile-container">
        <ProfileDetails user={user} onClick={handleClick} />
        {showComponent ? <EditProfile user={user} setUser={setUser} /> : ""}
        <div className="button-logout-position">
          <div>
            <button className="button-logout" onClick={handleLogout}>
              LOGOUT
              <HiOutlineLogout
                style={{ paddingLeft: "3px", fontSize: "23px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  //Profile page 1
  //   const [isDivVisible, setDivVisible] = useState(false);
  //   const [date, setDate] = useState(new Date());
  //   const [profilePic, setProfilePic] = useState(Image);
  //   const [gender, setGender] = useState("");
  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePic(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   };
  //   const handleChange = (e) => {
  //     setGender(e.target.value);
  //   };
  //   return (
  //     <div className="main-container">
  //       <div className="leftside-profile">
  //         <h1>Akash</h1>
  //       </div>
  //       <div className="profile">
  //         <label htmlFor="photo-upload" className="custom-file-upload fas">
  //           <div className="img-wrap img-upload">
  //             <img
  //               for="photo-upload"
  //               src={profilePic}
  //               alt="Profile"
  //               className="profile-image"
  //             />
  //           </div>
  //           <input
  //             id="photo-upload"
  //             type="file"
  //             onChange={handleFileChange}
  //             accept="image/*"
  //           />
  //         </label>
  //         <h1 className="profile-name">John Doe</h1>
  //         <h3 className="profile-details">DOB: dd-mm-yyy</h3>
  //         <h3 className="profile-details">Gender: {gender} </h3>
  //         <h3 className="profile-details">Email: something@gmail.com</h3>
  //         <h3 className="profile-details">Phone: +1 123-456-7890</h3>
  //         <h3 className="profile-details">Address: 123 Main Street, Cityville</h3>
  //         <div className="btn-profile">
  //           <button
  //             className="rounded-button"
  //             onClick={() => setDivVisible((h) => !h)}
  //           >
  //             Edit
  //           </button>
  //           <button className="rounded-button">Log out</button>
  //         </div>
  //         {isDivVisible && (
  //           <div className="profile-edit">
  //             <h2>DOB</h2>
  //             <DatePicker
  //               className="datePicker-input"
  //               selected={date}
  //               onChange={(date) => setDate(date)}
  //             />
  //             <h2>Gender</h2>
  //             <select
  //               placeholder="Gender"
  //               className="profile-input"
  //               value={gender}
  //               onChange={handleChange}
  //             >
  //               <option value="Male">Male</option>
  //               <option value="Female">Female</option>
  //             </select>
  //             <h2>Phone Number</h2>
  //             <input type="number" className="profile-input"></input>
  //             <h2>Address</h2>
  //             <input className="profile-input"></input>
  //             <div className="save-btn">
  //               <button className="rounded-button">Save</button>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  //   return (
  //   <div className="main-container">
  //       <div className="profil-container">
  //         <h1>Akash</h1>
  //       </div>
  //     </div>
  //   );
}
