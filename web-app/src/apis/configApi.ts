import axios from "axios";
import { API_BASE_URL, ASSET_BASE_URL, SEARCH_TEST_BASE_URL, SPRING_BOOT_BASE_URL } from "../configs";
// import { store } from "../app/store";

// const CancelToken = axios.CancelToken;

const axiosAPI = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300 * 1000,
});

// axiosAPI.interceptors.request.use(
//   (config) => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${accessToken}`,
//       };
//     }
//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

axiosAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        // store.dispatch(setError(error.response.data));
      } else if (error.response.status === 401) {
      } else if (error.response.status === 404) {
      } else if (error.response.status === 500) {
        // store.dispatch(setError({ code: "SERVER_ERROR" }));
      }
    } else {
      return Promise.reject(error);
    }
  }
);

const axiosASSET = axios.create({
  baseURL: ASSET_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300 * 1000,
});

const axiosSpringBoot = axios.create({
  baseURL: SPRING_BOOT_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300 * 1000,
});

const axiosSearchTest = axios.create({
  baseURL: SEARCH_TEST_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300 * 1000,
});

export { axiosAPI, axiosASSET, axiosSpringBoot, axiosSearchTest };
