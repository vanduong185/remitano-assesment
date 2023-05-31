import { axios } from "../../configs/axiosConfig";
import { RegisterUserPayload, User } from "./typings";

export const registerUser = (payload: RegisterUserPayload) => {
  return axios.post<User>("/users", payload);
};

export const signIn = async (
  payload: RegisterUserPayload
): Promise<User | undefined> => {
  try {
    const { data } = await axios.post<User>("/users/login", payload);
    if (!data) {
      return undefined;
    }
    localStorage.setItem("c_user", JSON.stringify(data));
    return data;
  } catch (error) {
    return undefined;
  }
};
