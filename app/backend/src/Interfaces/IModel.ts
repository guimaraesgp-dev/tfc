export interface IGetAll<T> {
  getAll(): Promise<IGetAllResponse<T>>;
}

export type IGetAllResponse<T> = T[] | null;

export interface IGetById<T> {
  getById(id: number): Promise<T | null>;
}

export interface IGetBy<T, P> {
  getBy(params: P): Promise<T | null>;
}
