export interface IRequestBody {
  type: string;
  subject: string;
  grade?: number;
  level?: number;
  text?: string;
  page: number;
}