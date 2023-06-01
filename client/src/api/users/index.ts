import { axios } from "../../configs/axiosConfig";
import { RegisterUserPayload, SignInResponse, User } from "./typings";

export const registerUser = (payload: RegisterUserPayload) => {
  return axios.post<User>("/auth/sign-up", payload);
};

export const signIn = async (
  payload: RegisterUserPayload
): Promise<SignInResponse | undefined> => {
  try {
    const { data } = await axios.post<SignInResponse>("/auth/sign-in", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
