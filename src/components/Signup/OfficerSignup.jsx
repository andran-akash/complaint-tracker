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
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/i-tracker/login">
            <button type="button" className="white_btn">
              Sing in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit} t>
            <h1>Officer Registeration</h1>
            <ul className="create-officer-row">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className="input"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="input"
              />
              <input
                type="phone"
                placeholder="Mobile Number"
                name="phNumber"
                onChange={handleChange}
                value={data.phNumber}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Role"
                name="role"
                onChange={handleChange}
                value={data.role}
                required
                className="input"
              />
              <select
                defaultValue=""
                name="department"
                onChange={handleChange}
                required
                className="select-option-registe"
              >
                <option value="">--Select Department--</option>
                {departmentList.map((departmentValue) => {
                  return (
                    <option
                      key={departmentValue}
                      className="option"
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
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="input"
              />
            </ul>
          </form>
          {error && <div className="error_msg">{error}</div>}
          <button type="submit" onClick={handleSubmit} className="green_btn">
            Sing Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficerSignup;
