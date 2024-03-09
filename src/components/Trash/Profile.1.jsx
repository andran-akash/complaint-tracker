// import React, { useState } from "react";
// import { HiOutlineLogout } from "react-icons/hi";
// import { FiEdit } from "react-icons/fi";
// import { GrUpdate } from "react-icons/gr";
// import defaultAvatar from "./man.png";

// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "react-phone-number-input/style.css";
// export default function Profile() {
//   const [image, setImage] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLasttName] = useState("");

//   const [showComponent, setShowComponent] = useState(false);
//   const [buttonClicked, setButtonClicked] = useState(false);

//   const handleClick = () => {
//     setShowComponent(true);
//   };

//   function handleUpdate() {
//     setButtonClicked(true);

//     setFirstName(firstName);
//   }

//   // Function to handle file input change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setImage(reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="profile-container">
//         <div className="profile-pic">
//           <div className="profile-pic-container">
//             <div class="container">
//               <div class="gradient"></div>
//               <div class="content"></div>
//               <div className="avatar-container-main">
//                 <div className="avatar-container">
//                   <img
//                     src={image ? image : defaultAvatar} // Use uploaded image or default avatar
//                     alt="Profile Avatar"
//                     className="avatar"
//                   />
//                   {!image && <div className="avatar-overlay"></div>}
//                   {/* Display upload text if no image */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="file-input"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="profile-information">
//               <div>
//                 Name : {firstName} {lastName}{" "}
//               </div>
//               <div>Email: andranakash@gamil.com</div>
//               <div>DOB : dd/mm/yyyy</div>
//               <div>Mobile Number : 546521545454</div>
//               <div className="profile-address">Address : </div>
//               <div>Pin Code : 6328441</div>
//             </div>
//             <div className="button-edit-position">
//               <button onClick={handleClick} className="profile-edit">
//                 Edit <FiEdit />
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="profile-details">
//           <div>
//             <h6>User Information</h6>
//             <div className="profile-margin">
//               <div className="row">
//                 <div className="profile-coloum">
//                   <ul className="Grid-effect">
//                     <li>
//                       <div className="list-div">
//                         <label className="profile-label">First Name</label>
//                         <input
//                           className="text-input"
//                           type="text"
//                           value={firstName}
//                           onChange={(e) => setFirstName(e.target.value)}
//                         />
//                       </div>
//                     </li>
//                     <li>
//                       <label className="profile-label">Last Name</label>
//                       <input
//                         className="text-input"
//                         type="text"
//                         value={lastName}
//                         onChange={(e) => setLasttName(e.target.value)}
//                       />
//                     </li>
//                     <li>
//                       <div className="list-div">
//                         <label className="profile-label">Mobile Name</label>
//                         <input className="text-input"></input>
//                       </div>
//                     </li>
//                     <li>
//                       <label className="profile-label">Date of Birth</label>
//                       <input className="text-input"></input>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <h6 className="contact-container">Contact Information</h6>
//             <div className="profile-margin">
//               <div className="row">
//                 <div className="profile-coloum">
//                   <ul className="Grid-effect">
//                     <li>
//                       <div className="list-div">
//                         <label className="profile-label">Address</label>
//                         <input className="text-input"></input>
//                       </div>
//                     </li>
//                     <li>
//                       <label className="profile-label">Landmark</label>
//                       <input className="text-input"></input>
//                     </li>
//                     <li>
//                       <div className="list-div">
//                         <label className="profile-label">District</label>
//                         <input className="text-input"></input>
//                       </div>
//                     </li>
//                     <li>
//                       <label className="profile-label">Pin-code</label>
//                       <input className="text-input"></input>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="button-update-position">
//               <button className="profile-update" onClick={handleUpdate}>
//                 Update <GrUpdate />
//               </button>
//             </div>
//             {/* <div className="button-edit-position">
//             <button className="profile-edit">
//               Edit <FiEdit />
//             </button>
//           </div> */}
//           </div>
//         </div>
//         <div className="button-logout-position">
//           <div>
//             <button className="button-logout">
//               LOGOUT <HiOutlineLogout />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   //Profile page 1
//   //   const [isDivVisible, setDivVisible] = useState(false);
//   //   const [date, setDate] = useState(new Date());
//   //   const [profilePic, setProfilePic] = useState(Image);
//   //   const [gender, setGender] = useState("");
//   //   const handleFileChange = (e) => {
//   //     const file = e.target.files[0];
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setProfilePic(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   };
//   //   const handleChange = (e) => {
//   //     setGender(e.target.value);
//   //   };
//   //   return (
//   //     <div className="main-container">
//   //       <div className="leftside-profile">
//   //         <h1>Akash</h1>
//   //       </div>
//   //       <div className="profile">
//   //         <label htmlFor="photo-upload" className="custom-file-upload fas">
//   //           <div className="img-wrap img-upload">
//   //             <img
//   //               for="photo-upload"
//   //               src={profilePic}
//   //               alt="Profile"
//   //               className="profile-image"
//   //             />
//   //           </div>
//   //           <input
//   //             id="photo-upload"
//   //             type="file"
//   //             onChange={handleFileChange}
//   //             accept="image/*"
//   //           />
//   //         </label>
//   //         <h1 className="profile-name">John Doe</h1>
//   //         <h3 className="profile-details">DOB: dd-mm-yyy</h3>
//   //         <h3 className="profile-details">Gender: {gender} </h3>
//   //         <h3 className="profile-details">Email: something@gmail.com</h3>
//   //         <h3 className="profile-details">Phone: +1 123-456-7890</h3>
//   //         <h3 className="profile-details">Address: 123 Main Street, Cityville</h3>
//   //         <div className="btn-profile">
//   //           <button
//   //             className="rounded-button"
//   //             onClick={() => setDivVisible((h) => !h)}
//   //           >
//   //             Edit
//   //           </button>
//   //           <button className="rounded-button">Log out</button>
//   //         </div>
//   //         {isDivVisible && (
//   //           <div className="profile-edit">
//   //             <h2>DOB</h2>
//   //             <DatePicker
//   //               className="datePicker-input"
//   //               selected={date}
//   //               onChange={(date) => setDate(date)}
//   //             />
//   //             <h2>Gender</h2>
//   //             <select
//   //               placeholder="Gender"
//   //               className="profile-input"
//   //               value={gender}
//   //               onChange={handleChange}
//   //             >
//   //               <option value="Male">Male</option>
//   //               <option value="Female">Female</option>
//   //             </select>
//   //             <h2>Phone Number</h2>
//   //             <input type="number" className="profile-input"></input>
//   //             <h2>Address</h2>
//   //             <input className="profile-input"></input>
//   //             <div className="save-btn">
//   //               <button className="rounded-button">Save</button>
//   //             </div>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   //   return (
//   //   <div className="main-container">
//   //       <div className="profil-container">
//   //         <h1>Akash</h1>
//   //       </div>
//   //     </div>
//   //   );
// }
