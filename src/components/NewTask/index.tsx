import { PlusCircle } from "phosphor-react";
import { FormEvent } from "react";

import styles from "./styles.module.css";

export function NewTask() {
  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    alert("Ainda não implementada!");
  }

  return (
    <form onSubmit={handleCreateTask} className={styles.form}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Criar <PlusCircle size={16} />
      </button>
    </form>
  );
}
