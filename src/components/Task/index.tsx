import { Trash } from "phosphor-react";
import { ChangeEvent } from "react";
import styles from "./styles.module.css";

interface ITaskProps {
  title: string;
  isChecked: boolean;
  onCheck: (value: boolean) => void;
  onDelete: () => void;
}

export function Task({ title, isChecked, onCheck, onDelete }: ITaskProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked;
    onCheck(value);
  }

  return (
    <div className={styles.task}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? <del>{title}</del> : <p>{title}</p>}
      <button type="button" onClick={onDelete}>
        <Trash size={20} />
      </button>
    </div>
  );
}
