import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

export function toDoRoutes(server: Server) {
  server.get(`/todo`, (schema: AppSchema) => {
    const todos = schema.all("toDo");

    return new Response(200, {}, todos);
  });
}
