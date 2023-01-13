import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

interface ICreateToDoBody {
  title: string;
}

interface IUpdateToDoBody {
  title?: string;
  isCompleted?: boolean;
}

export function toDoRoutes(server: Server) {
  server.get(`/todo`, (schema: AppSchema) => {
    const toDos = schema.all("toDo");

    return new Response(200, {}, toDos);
  });

  server.post(`/todo`, (schema: AppSchema, { requestBody }) => {
    const { title } = JSON.parse(requestBody) as ICreateToDoBody;

    if (!title) {
      return new Response(400, {}, { message: "Faltando o título da tarefa" });
    }

    const newToDo = schema.create("toDo", {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    });

    return new Response(202, {}, { toDo: newToDo });
  });

  server.delete(`/todo/:id`, (schema: AppSchema, { params }) => {
    const { id } = params;

    if (!id) {
      return new Response(400, {}, { message: "Faltando ID da tarefa" });
    }

    const toDo = schema.find("toDo", id);

    if (!toDo) {
      return new Response(404, {}, { message: "Tarefa não foi encontrada" });
    }

    toDo.destroy();

    return new Response(202);
  });

  server.patch(`/todo/:id`, (schema: AppSchema, { params, requestBody }) => {
    const id = params.id;

    if (!id) {
      return new Response(400, {}, { message: "Faltando ID da tarefa" });
    }

    const { isCompleted, title } = JSON.parse(requestBody) as IUpdateToDoBody;

    if (typeof(isCompleted) !== "boolean" && !title) {
      return new Response(400, {}, { message: "Faltando corpo da requisição" });
    }

    const toDo = schema.find("toDo", id);

    if (!toDo) {
      return new Response(404, {}, { message: "Tarefa não foi encontrada!" });
    }

    toDo.update({
      isCompleted: isCompleted || toDo.isCompleted,
      title: title || toDo.title,
    });

    return new Response(
      202,
      {},
      {
        toDo: toDo,
      }
    );
  });
}
