import axios, { AxiosResponse } from "axios";
import { constants } from "../../../config/constants";

interface RegisterServiceParams {
  email: string;
  password: string;
  username: string;
}

interface LoginServiceParams {
  username_or_email: string;
  password: string;
}

interface UserData {}

// Register user
export const registerService = async ({
  email,
  password,
  username,
}: RegisterServiceParams): Promise<UserData> => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  const { data }: AxiosResponse<UserData> = await axios.post(
    `${constants.backendBaseUrl}/auth/signup`,
    { email, password, username },
    config
  );

  return data;
};

export const loginService = async ({
  username_or_email,
  password,
}: LoginServiceParams): Promise<UserData> => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  console.log(`${constants.backendBaseUrl}/auth/login`);
  const { data }: AxiosResponse<UserData> = await axios.post(
    `${constants.backendBaseUrl}/auth/login`,
    { username_or_email, password },
    config
  );

  return data;
};
