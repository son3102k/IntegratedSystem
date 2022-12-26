import { IRequestBody } from "../interfaces/searchTest";
import { axiosAPI as api } from "./configApi";

const getTestAPI = async (requestBody: IRequestBody, webName?: string) => {
  const url = webName === null ? "/search" : `/search/${webName}`;
  const registerResult = await api({
    method: "POST",
    url,
    data: requestBody,
  });
  return registerResult;
};

export { getTestAPI };
