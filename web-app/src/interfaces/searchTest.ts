export interface IRequestBody {
  type: string;
  subject: string;
  grade?: number;
  level?: number;
  text?: string;
  page: number;
}

export interface IResponse {
  title: string;
  link: string;
  date: string;
  source: string;
}
