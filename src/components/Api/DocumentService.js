import axios from "axios";
import AuthenticationService from "./AuthenticationService.js";

const documentSvcUri = "http://localhost:8080";

const DocumentService = {
  uploadFile: async (profileId, files) => {
    const url = `${documentSvcUri}/upload/${profileId}`;
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
  downloadFile: async (profileId, fileId) => {
    const url = `${documentSvcUri}/download/${fileId}`;
    return await axios
      .get(url, {
        headers: {
          ProfileId: profileId,
          Authorization:
            "Bearer " + AuthenticationService.getLoggedInUserToken(),
        },
        responseType: "blob",
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
};

export default DocumentService;
