import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import React from "react";
import "./Navbar.css";
import { navItems } from "./NavItems.js";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <>
      <header>
        <div className="title">
          <FaLeaf />
          <h4>I-Tracker</h4>
        </div>
        <div styles="float-right">
          <nav ref={navRef}>
            {navItems.map((item) => {
              // if (item.title === "Create New") {
              //   return (
              //     <div key={item.id} className={item.cName}>
              //       <Link to={item.path}>{item.title}</Link>
              //     </div>
              //   );
              // }
              return (
                <div key={item.id} onClick={showNavbar} className={item.cName}>
                  <Link to={item.path}>{item.title}</Link>
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
