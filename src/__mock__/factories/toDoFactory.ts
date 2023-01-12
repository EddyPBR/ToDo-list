import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { IToDoFactory } from "../types/ToDo";

export const toDoFactory = Factory.extend<IToDoFactory>({
  id() {
    return faker.datatype.uuid();
  },
  title() {
    return faker.lorem.sentences(1);
  },
  isCompleted() {
    return faker.datatype.boolean();
  },
});
