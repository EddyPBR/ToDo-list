import { PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

import styles from "./styles.module.css";

interface CreateToDoForm {
  onCreateToDo: (title: string) => Promise<void>;
}

export function CreateToDoForm({ onCreateToDo }: CreateToDoForm) {
  const [title, setTitle] = useState("");
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);

  async function handleCreateToDo(event: FormEvent) {
    event.preventDefault();

    try {
      setIsCreatingTodo(true);

      await onCreateToDo(title);

      setTitle("");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsCreatingTodo(false);
    }
  }

  return (
    <form onSubmit={handleCreateToDo} className={styles.form}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isCreatingTodo}
        required
      />
      <button type="submit" disabled={isCreatingTodo} className={styles.button}>
        Criar
        {isCreatingTodo ? (
          <TailSpin color="#fff" height={18} width={18} visible={true} />
        ) : (
          <PlusCircle size={18} />
        )}
      </button>
    </form>
  );
}
