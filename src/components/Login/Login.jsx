import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
import AuthenticationService from "../Api/AuthenticationService";
import TicketsService from "../Api/TicketsService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Login = ({ setLoggedIn, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responseData = await AuthenticationService.registerSuccessfulLogin(
      data
    );
    setLoggedIn(AuthenticationService.isUserLoggedIn);
    if (responseData.profileId) {
      const userData = await TicketsService.getProfileById(
        responseData.profileId
      );
      setUser(userData);
      navigate(`/i-tracker/users/${responseData.profileId}/tickets`);
    } else if (responseData.error) {
      setLoading(false);
      setError(responseData.error.message);
    } else {
      setLoading(false);
      setError("Unknown Error. Pls try after sometime");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              className={styles.green_btn}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sing in"}
            </button>
            {loading && <LoadingSpinner />}
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/i-tracker/signup">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
