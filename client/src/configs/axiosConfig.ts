import axiosModule from "axios";

const instance = axiosModule.create({
  baseURL: `${process.env.REACT_APP_SERVER_ADDRESS}`,
});

instance.interceptors.request.use(async (config) => {
  const userLocal = localStorage.getItem("c_user");
  const userData = userLocal ? JSON.parse(userLocal) : undefined;
  if (userData) {
    const { token } = userData;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token.tokenInfo}`,
    };
  }
  return config;
});

export const axios = instance;
