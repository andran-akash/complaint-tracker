import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./home.css";
import ComplaintCard from "./CurrentComplaint/ComplaintCard.jsx";
import ComplaintsTableView from "../Admin/ComplaintsTableView.jsx";
import TicketsService from "../Api/TicketsService.js";

export default function AllComplaints({ user }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [tickets, setTickets] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [gridView, setGridView] = useState();
  const [error, setError] = useState("");
  // let location = useLocation();
  let { profileId } = useParams();
  let mounted = true;

  useEffect(() => {
    fetchData(mounted);
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (user.role !== undefined && user.role === "admin") {
      setGridView(true);
    } else {
      setGridView(false);
    }
  }, [user]);

  async function fetchData(mounted) {
    if (mounted) {
      await TicketsService.getAllTicketsForUser(profileId).then((response) => {
        if (response.tickets !== undefined) {
          setTickets(response.tickets);
        }
        setAccessList(response.access.accessList);
        if (response.error) {
          setError(response.error);
        }
      });
    }
  }

  return (
    <div className="home-main-container">
      {/* <StickyHeader /> */}
      {/* <StepsCarousel /> */}
      <div className="current-complaints">
        <h1>
          {/* <GiFeatheredWing /> */}
          Current Complaints
        </h1>
      </div>
      {user.role === "admin" && !gridView && (
        <button onClick={() => setGridView(true)}>Grid</button>
      )}
      {user.role === "admin" && gridView && (
        <button onClick={() => setGridView(false)}>Card</button>
      )}
      {!gridView && (
        <>
          <div className="complaint-main-container">
            <ul className="card-element">
              {tickets !== "" &&
                tickets.map(
                  (ticket) =>
                    ticket.status !== "Resolved" && (
                      <li className="box" key={ticket.id}>
                        <ComplaintCard
                          ticket={ticket}
                          accessList={accessList}
                        />
                      </li>
                    )
                )}
            </ul>
          </div>
        </>
      )}
      {gridView && (
        <ComplaintsTableView
          user={user}
          tickets={tickets}
          accessList={accessList}
        />
      )}
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
          {tickets !== "" &&
            tickets.map(
              (ticket) =>
                ticket.status === "Resolved" && (
                  <li className="box" key={ticket.id}>
                    <ComplaintCard ticket={ticket} accessList={accessList} />
                  </li>
                )
            )}
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
