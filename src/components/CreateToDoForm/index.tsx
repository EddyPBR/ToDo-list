import { PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Oval, TailSpin } from "react-loader-spinner";

import { createToDo, IToDoDTO } from "../../api/toDo";

import styles from "./styles.module.css";

interface CreateToDoForm {
  onCreateSuccess: (toDo: IToDoDTO) => void;
}

export function CreateToDoForm({ onCreateSuccess }: CreateToDoForm) {
  const [title, setTitle] = useState("");
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);

  async function handleCreateToDo(event: FormEvent) {
    event.preventDefault();

    try {
      setIsCreatingTodo(true);

      const response = await createToDo({ title });

      toast.success("Tarefa foi criada com sucesso!");

      onCreateSuccess(response.data.toDo);

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
