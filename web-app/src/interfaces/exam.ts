export interface IGetAllQuestionByIdRequest {
    
  }
  
  export interface IGetAllQuestionByIdResponse {

  }
  
  export interface IResponse {
    code: number;
    message: string;
    data: IGetAllQuestionByIdResponse;
  }
  
  export interface ITestDescription {
    id: number;
    name: string;
    type: string;
  }

  export interface IQuestion {
    questionId: number;
    examId: number;
    questionNumber: number;
    content: string;
  }

  export interface IAnswer {
    id: number;
    questionId: number;
    answerNumber: number;
    content: string;
  }

  export interface IListAnswer {
    answer: IAnswer[]
  }