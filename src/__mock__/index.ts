import { createServer } from "miragejs";
import { routes } from "./routes";
import { models } from "./models";
import { factories } from "./factories";

export function startMirageServer() {
  const server = createServer({
    models,
    factories,
    seeds(server) {
      server.createList("toDo", 3);
    },
  });

  server.logging = true;

  server.urlPrefix = import.meta.env.VITE_API_URL || "http://localhost:5173";

  for (const namespace of Object.keys(routes)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    routes[namespace](server);
  }

  // Reset
  server.namespace = "";
  server.passthrough();

  console.log({ database: server.db.dump() });
}
