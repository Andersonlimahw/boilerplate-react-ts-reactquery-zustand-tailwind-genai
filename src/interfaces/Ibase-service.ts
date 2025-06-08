export interface IBaseService<T> {
  baseUrl: string;
  options: string;
  response: T;
}

export interface IGetInput {
  endpoint: string;
  options?: any;
  params?: string;
}


export interface IPostInput {
  endpoint: string;
  options?: any;
  requestBody: any,
}

export type IPutInput = IPostInput;

export type IDeleteInput = IGetInput;