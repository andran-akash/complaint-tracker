import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./officersignup.css";
import AuthenticationService from "../Api/AuthenticationService";
import TicketsService from "../Api/TicketsService";
import { emptyOfficer } from "../Profile/Constants";
import { departmentList } from "../Profile/Constants";

const OfficerSignup = ({ setLoggedIn, setUser }) => {
  const [data, setData] = useState(emptyOfficer);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await AuthenticationService.registerNewOfficer(data);
    setLoggedIn(AuthenticationService.isUserLoggedIn);
    console.log(responseData);
    if (responseData.profileId) {
      const userData = await TicketsService.getProfileById(
        responseData.profileId,
        responseData.profileId
      );
      setUser(userData);
      navigate(`/i-tracker/users/${responseData.profileId}/tickets`);
    } else if (responseData.error) {
      setError(responseData.error.message);
    } else {
      setError("Unknown Error. Pls try after sometime");
    }
  };

  return (
    <div className="officer-signup-main">
      <div className="officer-signup_container">
        <div className="officer-signup_form_container">
          <div className="officer-left">
            <h1>Welcome Back</h1>
            <Link to="/i-tracker/login">
              <button type="button" className="officer-white_btn">
                Sing in
              </button>
            </Link>
          </div>
          <div className="officer-right">
            <form className="officer-form_container" onSubmit={handleSubmit} t>
              <h1>Officer Registeration</h1>
              <ul className="officer-create-officer-row">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="officer-input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="officer-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="officer-input"
                />
                <input
                  type="phone"
                  placeholder="Mobile Number"
                  name="phNumber"
                  onChange={handleChange}
                  value={data.phNumber}
                  required
                  className="officer-input"
                />
                <input
                  type="text"
                  placeholder="Role"
                  name="role"
                  onChange={handleChange}
                  value={data.role}
                  required
                  className="officer-input"
                />
                <select
                  defaultValue=""
                  name="department"
                  onChange={handleChange}
                  required
                  className="officer-select-option-register"
                >
                  <option value="">--Select Department--</option>
                  {departmentList.map((departmentValue) => {
                    return (
                      <option
                        key={departmentValue}
                        className="officer-option"
                        value={departmentValue}
                      >
                        {departmentValue}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="password"
                  placeholder="Secret"
                  name="secret"
                  onChange={handleChange}
                  value={data.secret}
                  required
                  className="officer-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="officer-input"
                />
              </ul>
              {error && <div className="officer-error_msg">{error}</div>}
              <button
                type="submit"
                onClick={handleSubmit}
                className="officer-green_btn"
              >
                Sing Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerSignup;
