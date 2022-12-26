import { axiosAPI as api } from "./configApi";
import { IDataUser } from "../interfaces/user";

const registerAPI = async (registerInfo: IDataUser) => {
  const registerResult = await api({
    method: "POST",
    url: "/auth/register",
    data: registerInfo,
  });
  return registerResult;
};

const loginAPI = async (credentials: IDataUser) => {
  const loginResult = await api({
    method: "POST",
    url: "/auth/login",
    data: credentials,
  });
  return loginResult;
};

export { registerAPI, loginAPI };
