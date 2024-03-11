import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import AuthenticationService from "../Api/AuthenticationService";
import TicketsService from "../Api/TicketsService";
import { emptyUserRegister } from "../Profile/Constants";

const Signup = ({ setLoggedIn, setUser }) => {
  const [data, setData] = useState(emptyUserRegister);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await AuthenticationService.registerNewUser(data);
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/i-tracker/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="phone"
              placeholder="Mobile Number"
              name="phNumber"
              onChange={handleChange}
              value={data.phNumber}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
