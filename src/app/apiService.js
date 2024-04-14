import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    // error = error.response.data;
    console.log("RESPONSE ERROR", error);
    const message = error.response?.data?.errors?.message || "Unknown error";
    return Promise.reject({ message });
    // return Promise.reject({ message: error.split("\n")[0] });
  }
);

export default apiService;
