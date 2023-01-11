import { PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";

import styles from "./styles.module.css";

interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface INewTaskProps {
  onCreateToDo: (toDo: IToDo) => void;
}

export function CreateToDoForm({ onCreateToDo }: INewTaskProps) {
  const [title, setTitle] = useState("");

  function handleCreateToDo(event: FormEvent) {
    event.preventDefault();

    const newToDo: IToDo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    };

    onCreateToDo(newToDo);

    setTitle("");
  }

  return (
    <form onSubmit={handleCreateToDo} className={styles.form}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <button type="submit" className={styles.button}>
        Criar <PlusCircle size={18} />
      </button>
    </form>
  );
}
