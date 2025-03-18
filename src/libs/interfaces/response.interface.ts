export interface IListResponse<T> {
  list: T[];
  totalRow: number;
  pageRow: number;
  hasNext: boolean;
  totalPage: number;
  page: number;
  size: number;
}

export interface IResponseBody<T> {
  msg: string;
  data?: T;
}
