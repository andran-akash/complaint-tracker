import axios from "axios";
import AuthenticationService from "./AuthenticationService.js";

const TicketsService = {
  getAllTicketsForUser: async (profileId) => {
    const url = `http://localhost:8080/profile/${profileId}/tickets`;
    return await axios
      .get(url, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
  createTicket: async (profileId, ticket) => {
    const url = `http://localhost:8080/profile/${profileId}/ticket`;
    return await axios
      .post(url, ticket, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
  updateTicket: async (profileId, ticketId, ticket) => {
    const url = `http://localhost:8080/profile/${profileId}/ticket/${ticketId}`;
    return await axios
      .put(url, ticket, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
  getTicketById: async (profileId, id) => {
    const url = `http://localhost:8080/profile/${profileId}/ticket/${id}`;
    return await axios
      .get(url, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
  getProfileById: async (profileId) => {
    console.log("profileId " + profileId);
    const url = `http://localhost:8080/profile/${profileId}`;
    return await axios
      .get(url, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
  updateProfileById: async (profileId, user) => {
    console.log("profileId " + profileId);
    const url = `http://localhost:8080/profile/${profileId}`;
    return await axios
      .put(url, user, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
  getDepartments: async (profileId, fieldNames) => {
    const url = `http://localhost:8080/fieldvalues?fieldNames=${fieldNames}`;
    return await axios
      .get(url, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
      })
      .then((response) => {
        console.log("response " + response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error " + error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          return error.response.data;
        }
      });
  },
};

export default TicketsService;
