import axios from "axios";

const AuthenticationService = {
  registerSuccessfulLogin: async (data) => {
    const url = "http://localhost:8081/loginsvc/login";
    return await axios
      .post(url, data)
      .then((response) => {
        sessionStorage.setItem("SESSION_TOKEN", response.data.token);
        // localStorage.setItem("token", res.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          // return error.response.data.message;
          return error.response.data;
        }
      });
  },
  registerNewUser: async (data) => {
    const url = "http://localhost:8081/loginsvc/register";
    return await axios
      .post(url, data)
      .then((response) => {
        sessionStorage.setItem("SESSION_TOKEN", response.data.token);
        // localStorage.setItem("token", res.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          // return error.response.data.message;
          return error.response.data;
        }
      });
  },
  registerNewOfficer: async (data) => {
    const url = "http://localhost:8081/loginsvc/register/officer";
    return await axios
      .post(url, data)
      .then((response) => {
        sessionStorage.setItem("SESSION_TOKEN", response.data.token);
        // localStorage.setItem("token", res.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          // return error.response.data.message;
          return error.response.data;
        }
      });
  },
  logout() {
    sessionStorage.removeItem("SESSION_TOKEN");
    return false;
  },
  isUserLoggedIn() {
    let user = sessionStorage.getItem("SESSION_TOKEN");
    if (user === null) {
      return false;
    }
    return true;
  },
  getLoggedInUserToken() {
    let user = sessionStorage.getItem("SESSION_TOKEN");
    if (user === null) {
      return "";
    }
    return user;
  },
};

export default AuthenticationService;
