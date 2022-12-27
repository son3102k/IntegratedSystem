import { IRequestBody } from "../interfaces/searchTest";
import { axiosAPI as api } from "./configApi";

const getSearchTestAPI = async (requestBody: IRequestBody, token: string, webName?: string) => {
  const url = "/data-warehouse" + (webName === "all" ? "/search" : `/search-from-web?web=${webName}`);
  const registerResult = await api({
    method: "POST",
    url,
    data: requestBody,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return registerResult;
};

export { getSearchTestAPI };
