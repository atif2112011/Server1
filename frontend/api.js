import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true, // send cookies with requests
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("Refreshing token");
        const { data } = await api.post("api/auth/refresh");
        if (data.success) {
          console.log("Refreshed token", data);

          localStorage.setItem("accessToken", data.accessToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } else {
          console.log("Refresh failed..redirecting to login", data.message);
          window.location.href = "/login";
        }
      } catch (err) {
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
