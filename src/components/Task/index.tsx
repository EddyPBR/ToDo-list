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
  const [isUpdatingToDo, setIsUpdatingToDo] = useState(false);

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

  async function handleUpdateToDo(isCompleted: boolean) {
    try {
      setIsUpdatingToDo(true);

      await updateToDo({ id, isCompleted });

      toast.success(
        isCompleted
          ? "Tarefa marcada concluída"
          : "Tarefa marcada como NÃO concluída"
      );

      onCheck(isCompleted);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdatingToDo(false);
    }
  }

  return (
    <div className={styles.task}>
      {
        isUpdatingToDo
          ? <Puff height={20} width={20} color="#4ea8de" />
          : (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(event) => handleUpdateToDo(event.target.checked)}
            />
          )
      }
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
