import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import type { IToDoModel } from "../types/ToDo";

const toDoModel: ModelDefinition<IToDoModel> = Model.extend({});

export const models = {
  toDo: toDoModel,
};
