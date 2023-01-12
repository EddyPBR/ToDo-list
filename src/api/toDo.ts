import { api, apiException } from "../services/api";

export interface IToDoDTO {
  id: string; // uuid
  title: string;
  isCompleted: boolean;
}

interface IGetToDosResponse {
  toDos: IToDoDTO[];
}

export async function getTodos() {
  try {
    return await api.get<IGetToDosResponse>("/todo");
  } catch (error: any) {
    throw apiException(error as Error);
  }
}
