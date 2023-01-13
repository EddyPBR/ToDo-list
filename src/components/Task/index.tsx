import { Trash } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Discuss } from "react-loader-spinner";
import { deleteToDo } from "../../api/toDo";
import styles from "./styles.module.css";

interface ITaskProps {
  id: string;
  title: string;
  isChecked: boolean;
  onCheck: (value: boolean) => void;
  onDeleteSuccess: (toDoId: string) => void;
}

export function Task({
  id,
  title,
  isChecked,
  onCheck,
  onDeleteSuccess,
}: ITaskProps) {
  const [isDeletingToDo, setIsDeletingToDo] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked;
    onCheck(value);
  }

  async function handleDeleteToDo() {
    try {
      setIsDeletingToDo(true);

      await deleteToDo({ id });

      toast.success("Tarefa removida");

      onDeleteSuccess(id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeletingToDo(false);
    }
  }

  return (
    <div className={styles.task}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? <del>{title}</del> : <p>{title}</p>}
      <button
        type="button"
        disabled={isDeletingToDo}
        onClick={handleDeleteToDo}
      >
        {isDeletingToDo ? (
          <Discuss height={20} width={20} />
        ) : (
          <Trash size={20} />
        )}
      </button>
    </div>
  );
}
