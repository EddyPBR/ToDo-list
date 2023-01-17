import { Trash } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Discuss, Puff } from "react-loader-spinner";
import { deleteToDo, updateToDo } from "../../api/toDo";
import styles from "./styles.module.css";

interface ITaskProps {
  id: string;
  title: string;
  isChecked: boolean;
  onDeleteToDo: (toDoId: string) => Promise<void>;
  onCheckToDo: (toDoId: string, isCompleted: boolean) => Promise<void>;
}

export function Task({
  id,
  title,
  isChecked,
  onDeleteToDo,
  onCheckToDo,
}: ITaskProps) {
  const [isDeletingToDo, setIsDeletingToDo] = useState(false);
  const [isUpdatingToDo, setIsUpdatingToDo] = useState(false);

  async function handleDeleteToDo() {
    try {
      setIsDeletingToDo(true);

      await onDeleteToDo(id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeletingToDo(false);
    }
  }

  async function handleCheckToDo(isCompleted: boolean) {
    try {
      setIsUpdatingToDo(true);

      await onCheckToDo(id, isCompleted);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdatingToDo(false);
    }
  }

  return (
    <div className={styles.task}>
      {isUpdatingToDo ? (
        <Puff height={20} width={20} color="#4ea8de" />
      ) : (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => handleCheckToDo(event.target.checked)}
        />
      )}
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
