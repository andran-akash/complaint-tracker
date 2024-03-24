import React, { useState, useEffect } from "react";
import "./stickyheader.css"; // Import CSS for styling
import Madara from "../Images/Madara1.png";

import { ImPower } from "react-icons/im";

const StickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0); // Check if the user has scrolled
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`sticky-header ${isSticky ? "sticky" : ""}`}>
      <div className="sticky-main-container">
        {" "}
        {/* <ImPower
          style={{
            fontSize: "200px",
            marginLeft: "20%",
            marginRight: "5%",
            marginTop: "2%",
          }}
        /> */}
        <div className="sticky-primary-container">
          <div className="sticky-header-content">
            <div className="sticky-header-content1">Do not</div>
            <div className="sticky-header-content2">
              Miss Understand it, this is not <span>power</span> of your
              creation
            </div>
            {/* <button className="sticky-button">GET STARTERD</button> */}
          </div>
        </div>
        <img className="Madara-uchiha-image" src={Madara} alt="madara" />
      </div>
    </div>
  );
};

export default StickyHeader;
