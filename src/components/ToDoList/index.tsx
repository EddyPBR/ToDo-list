import { Task } from "../Task";

import styles from "./styles.module.css";

import clipboardSvg from "../../assets/clipboard.svg";

interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface IToDoListProps {
  toDos: IToDo[];
  onChangeToDo: (toDos: IToDo[]) => void;
}

export function ToDoList({ toDos, onChangeToDo }: IToDoListProps) {
  function deleteToDo(id: string) {
    const updatedToDos = toDos.filter((toDo) => toDo.id !== id);
    onChangeToDo(updatedToDos);
  }

  function checkToDo(id: string, value: boolean) {
    const updatedToDos = toDos.map((toDo) =>
      toDo.id === id ? { ...toDo, isCompleted: value } : toDo
    );
    onChangeToDo(updatedToDos);
  }

  if (toDos.length === 0) {
    return (
      <section className={styles.empty}>
        <img
          src={clipboardSvg}
          alt="Você ainda não tem tarefas cadastradas"
          width="56"
          height="56"
        />

        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </section>
    );
  }

  return (
    <section className={styles.list}>
      {toDos.map((toDo) => (
        <Task
          key={toDo.id}
          id={toDo.id}
          title={toDo.title}
          isChecked={toDo.isCompleted}
          onDeleteSuccess={() => deleteToDo(toDo.id)}
          onCheck={(value) => checkToDo(toDo.id, value)}
        />
      ))}
    </section>
  );
}
