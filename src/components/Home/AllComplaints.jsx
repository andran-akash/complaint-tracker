import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { GiFeatheredWing } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import "./home.css";
import ComplaintCard from "./CurrentComplaint/ComplaintCard.jsx";
import ResolvedCompliant from "./ResolvedComplaints/ResolvedCompliant.jsx";
import TicketsService from "../Api/TicketsService.js";

export default function AllComplaints({ user }) {
  const [tickets, setTickets] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // let location = useLocation();
  let { profileId } = useParams();
  let mounted = true;

  useEffect(() => {
    fetchData(mounted);
    return () => (mounted = false);
  }, []);

  async function fetchData(mounted) {
    if (mounted) {
      await TicketsService.getAllTicketsForUser(profileId).then((response) => {
        if (response.tickets !== undefined) setTickets(response.tickets);
        setAccessList(response.access.accessList);
        if (response.error) {
          setError(response.error);
        }
      });
    }
  }

  return (
    <div className="home-main-container">
      <div className="current-complaints">
        <h1>
          {/* <GiFeatheredWing /> */}
          Current Complaints
        </h1>
      </div>
      <div className="complaint-main-container">
        <ul className="card-element">
          {tickets !== "" &&
            tickets.map(
              (ticket) =>
                ticket.status === "Open" && (
                  <li className="box" key={ticket.id}>
                    <ComplaintCard ticket={ticket} accessList={accessList} />
                  </li>
                )
            )}
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
          {/* <GiCheckedShield /> */}
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
