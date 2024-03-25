import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import "./admintable.css";

export default function ComplaintsTableView({ user, tickets, accessList }) {
  // const [tickets, setTickets] = useState([]);
  // const [accessList, setAccessList] = useState([]);
  const [unResolvedTickets, setUnResolvedTickets] = useState([]);
  const navigate = useNavigate();
  // let location = useLocation();
  let { profileId } = useParams();
  let mounted = true;

  useEffect(() => {
    fetchData(mounted);
    return () => (mounted = false);
  }, [tickets]);

  async function fetchData(mounted) {
    if (mounted) {
      if (tickets !== undefined) {
        setUnResolvedTickets(
          tickets.filter((ticket) => ticket.status !== "Resolved")
        );
      }
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
              <th>Land mark</th>
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
                  <td className="admin-tbody-th-phone">
                    {ticket.location.landmark}
                  </td>
                  <td>{ticket.location.pincode}</td>
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
