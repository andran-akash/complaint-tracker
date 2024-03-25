import axios from "axios";
import AuthenticationService from "./AuthenticationService.js";

const ticketSvcUri = "http://localhost:8080";

const TicketsService = {
  getAllTicketsForUser: async (profileId) => {
    const url = `${ticketSvcUri}/profile/${profileId}/tickets`;
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
    const url = `${ticketSvcUri}/profile/${profileId}/ticket`;
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
    const url = `${ticketSvcUri}/profile/${profileId}/ticket/${ticketId}`;
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
    const url = `${ticketSvcUri}/profile/${profileId}/ticket/${id}`;
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
  getProfileById: async (profileId, currentProfileId) => {
    // console.log("profileId " + profileId);
    const url = `${ticketSvcUri}/profile/${profileId}`;
    return await axios
      .get(url, {
        headers: {
          ProfileId: currentProfileId,
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
    const url = `${ticketSvcUri}/profile/${profileId}`;
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
  uploadFile: async (profileId, files) => {
    const url = `${ticketSvcUri}/upload/${profileId}`;
    let formData = new FormData();
    formData.append("file", files);
    return await axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    const url = `${ticketSvcUri}/fieldvalues?fieldNames=${fieldNames}`;
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
  getUsersByDepartments: async (profileId) => {
    const url = `${ticketSvcUri}/departments/profiles`;
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
