import axiosModule from "axios";

const instance = axiosModule.create({
  baseURL: `${process.env.REACT_APP_SERVER_ADDRESS}`,
});

instance.interceptors.request.use(async (config) => {
  // TODO: inject token
  return config;
});

export const axios = instance;
