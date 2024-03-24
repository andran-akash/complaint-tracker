import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link, useParams, useMatch } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import "./Navbar.css";
import { navItems } from "./NavItems.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

import TicketsService from "../Api/TicketsService.js";

export default function Navbar({ loggedIn, user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState("");
  const match = useMatch("i-tracker/users/:profileId/*");
  let mounted = true;

  useEffect(() => {
    // console.log("user " + user.role);
    if (match) {
      setProfileId(match.params.profileId);
      fetchData(mounted, match.params.profileId);
    }
    return () => (mounted = false);
  }, [match, user.role]);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  async function fetchData(mounted, profileIdParam) {
    setLoading(true);
    if (mounted && profileIdParam !== "") {
      await TicketsService.getProfileById(profileIdParam, profileIdParam).then(
        (response) => {
          console.log(response);
          if (response !== undefined) setUser(response);
        }
      );
    }
    setLoading(false);
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <header>
        <div className="title">
          <FaLeaf />
          <h4>I-Tracker</h4>
        </div>
        <div styles="float-right">
          <nav ref={navRef}>
            {navItems.map((item) => {
              const href = item.path.replace(":profileId", profileId);
              // if (item.title === "Create New") {
              //   return (
              //     <div key={item.id} className={item.cName}>
              //       <Link to={item.path}>{item.title}</Link>
              //     </div>
              //   );
              // }
              return (
                <div key={item.id} onClick={showNavbar} className={item.cName}>
                  <Link to={href}>{item.title}</Link>
                </div>
              );
            })}

            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </header>
    </>
  );
}

//   const showNavbar = () => {
//     navRef.current.classList.toggle("responsive_nav");
//   };

//   return (
//     <>
//       <BrowserRouter>
//         <header>
//           <div className="title">
//             <FaLeaf />
//             <h4>I-Tracker</h4>
//           </div>
//           <div styles="float-right">
//             <nav ref={navRef}>
//               <ul>
//                 {navItems.map((item) => {
//                   <li key={item.id} className={item.cName}>
//                     <Link to={item.path}>{item.title}</Link>
//                   </li>;
//                 })}
//               </ul>
//               <button className="nav-btn nav-close-btn" onClick={showNavbar}>
//                 <FaTimes />
//               </button>
//             </nav>
//             <button className="nav-btn" onClick={showNavbar}>
//               <FaBars />
//             </button>
//           </div>
//         </header>
//       </BrowserRouter>
//     </>
//   );
// }
