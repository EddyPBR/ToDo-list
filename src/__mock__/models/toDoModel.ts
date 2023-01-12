import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import type { IToDoModel } from "../types/ToDo";

export const toDoModel: ModelDefinition<IToDoModel> = Model.extend({});
