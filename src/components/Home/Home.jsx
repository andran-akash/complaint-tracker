import React from "react";
import { GiFeatheredWing } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import "./home.css";
import CurrentComplaint from "./CurrentComplaint/CurrentComplaint.jsx";
import ResolvedCompliant from "./ResolvedComplaints/ResolvedCompliant.jsx";

export default function Home() {
  return (
    <div className="home-main-container">
      <div className="current-complaints">
        <h1>
          <GiFeatheredWing />
          Current Complaints
        </h1>
      </div>
      <div className="complaint-main-container">
        <ul className="card-element">
          {/* <li className="box">
          <CardElement />
        </li> */}
          <li className="box">
            <CurrentComplaint />
          </li>
          {/* <li className="box">
            <CurrentComplaint />
          </li>
          <li className="box">
            <CurrentComplaint />
          </li>
          <li className="box">
            <CurrentComplaint />
          </li>
          <li className="box">
            <CurrentComplaint />
          </li> */}
        </ul>
      </div>

      {/* <div className="complaints">
        <CurrentComplaint /> */}
      {/* <div className="home-top-container">top</div> */}
      {/* </div> */}
      <div className="Resolved-complaints">
        <h1>
          <GiCheckedShield />
          Resolved Complaints
        </h1>
      </div>

      <div className="complaint-main-container">
        <ul className="card-element">
          <li className="box">
            <ResolvedCompliant />
          </li>
        </ul>
      </div>

      {/* <div className="complaints">
        <ResolvedCompliant />
        <div className="home-bottom-container">bottom</div>
        <div className="resolved-complaints-bottom"></div>
      </div> */}
    </div>
  );
}
