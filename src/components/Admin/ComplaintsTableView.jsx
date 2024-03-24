import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import "./admintable.css";
import TicketsService from "../Api/TicketsService.js";

export default function ComplaintsTableView({ user }) {
  const [tickets, setTickets] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [unResolvedTickets, setUnResolvedTickets] = useState([]);
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
        if (response.tickets !== undefined) {
          setTickets(response.tickets);
          setUnResolvedTickets(
            response.tickets.filter((ticket) => ticket.status !== "Resolved")
          );
        }
        setAccessList(response.access.accessList);
        if (response.error) {
          setError(response.error);
        }
      });
    }
  }

  return (
    <div className="admin-table-main-container">
      <div className="admin-table-primary-container">
        <table className="admin-table-container">
          <thead className="admin-thead">
            <tr className="admin-thead-tr">
              <th>s.no</th>
              <th className="admin-thead-th-id"> complaint id</th>
              <th>subject</th>
              <th>department</th>
              <th>Created date</th>
              <th>Phone number</th>
              <th>pincode</th>
              <th>status</th>
              <th>View</th>
              <th>update</th>
            </tr>
          </thead>
          <tbody className="admin-tbody">
            {unResolvedTickets !== "" &&
              unResolvedTickets.map((ticket, index) => (
                <tr key={ticket.id} className="admin-tbody-tr">
                  <td>{index + 1}</td>
                  <td className="admin-tbody-th-id">{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td className="admin-tbody-th-department">
                    {ticket.department}
                  </td>
                  <td className="admin-tbody-th-createddate">
                    {ticket.createdDt}
                  </td>
                  <td className="admin-tbody-th-phone">1234567890</td>
                  <td>{ticket.createdDt}</td>
                  <td>{ticket.status}</td>
                  {accessList !== "" &&
                    accessList.map((access) => {
                      return (
                        access.accessName === "ticket" &&
                        access.accessTarget === "ticket" && (
                          <td>
                            <button
                              className="admin-tbody-view-button"
                              onClick={() => {
                                navigate(
                                  `../i-tracker/users/${profileId}/tickets/${ticket.id}/${access.accessLevel}`
                                );
                              }}
                            >
                              {access.accessLevel}
                            </button>
                          </td>
                        )
                      );
                    })}
                  {/* <td>
                        <button className="admin-tbody-view-button">
                          View
                        </button>
                      </td>
                      <td>
                        <button className="admin-tbody-update-button">
                          update
                        </button>
                      </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
