import { IGetAllQuestionByIdRequest } from "../interfaces/exam";
import { axiosAPI as api } from "./configApi";

const getAllQuestionByExamId = async (token: string, id: number) => {
  const url = `/test/exam?id=${id}`;
  const getAllQuestionByExamIdResult = await api({
    method: "POST",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getAllQuestionByExamIdResult;
};

const getAllTest = async (token: string) => {
    const url = "/test/list";
    const getAllTestResult = await api({
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return getAllTestResult;
  };

export { getAllQuestionByExamId, getAllTest };
