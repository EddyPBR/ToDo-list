import { api, apiException } from "../services/api";

export interface IToDoDTO {
  id: string; // uuid
  title: string;
  isCompleted: boolean;
}

interface IGetToDosResponse {
  toDos: IToDoDTO[];
}

interface ICreateToDoBody {
  title: string;
}

interface ICreateToDoResponse {
  toDo: IToDoDTO;
}

interface IDeleteToDoParams {
  id: string;
}

interface IUpdateToDoBody {
  id: string;
  title?: string;
  isCompleted?: boolean;
}

export async function getTodos() {
  try {
    return await api.get<IGetToDosResponse>("/todo");
  } catch (error: any) {
    throw apiException(error as Error);
  }
}

export async function createToDo({ title }: ICreateToDoBody) {
  try {
    return await api.post<ICreateToDoResponse>("/todo", {
      title,
    });
  } catch (error: any) {
    throw apiException(error as Error);
  }
}

export async function deleteToDo({ id }: IDeleteToDoParams) {
  try {
    return await api.delete<ICreateToDoResponse>(`/todo/${id}`);
  } catch (error: any) {
    throw apiException(error as Error);
  }
}

export async function updateToDo({ id, isCompleted, title }: IUpdateToDoBody) {
  try {
    return await api.patch<ICreateToDoResponse>(`/todo/${id}`, {
      title,
      isCompleted,
    });
  } catch (error: any) {
    throw apiException(error as Error);
  }
}
