export interface IRequestBody {
  type: string;
  subject: string;
  grade: string;
  level: string;
  text: string;
  page: string;
}

export interface IResponse {
  title: string;
  link: string;
  date: string;
  source: string;
}
