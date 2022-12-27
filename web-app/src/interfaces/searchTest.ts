export interface IRequestBody {
  type: string;
  subject: string;
  grade: string;
  level: string;
  text: string;
  page: string;
}

export interface IDataResponse {
  title: string;
  link: string;
  date: string;
  source: string;
}

export interface IResponse {
  code: number;
  message: string;
  data: IDataResponse[];
}
