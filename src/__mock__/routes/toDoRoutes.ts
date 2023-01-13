import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

interface ICreateToDoBody {
  title: string;
}

export function toDoRoutes(server: Server) {
  server.get(`/todo`, (schema: AppSchema) => {
    const toDos = schema.all("toDo");

    return new Response(200, {}, toDos);
  });

  server.post(`/todo`, (schema: AppSchema, { requestBody }) => {
    const { title } = JSON.parse(requestBody) as ICreateToDoBody;

    if (!title) {
      return new Response(400, {}, { message: "Title is required!" });
    }

    const newToDo = schema.create("toDo", {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    });

    return new Response(202, {}, { toDo: newToDo });
  });
}
