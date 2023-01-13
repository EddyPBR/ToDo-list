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
