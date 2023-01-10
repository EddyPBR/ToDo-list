import { Trash } from "phosphor-react";
import styles from "./styles.module.css";

export function Task() {
  return (
    <div className={styles.task}>
      <input type="radio" />
      <p>
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </p>
      <button type="button">
        <Trash size={20} />
      </button>
    </div>
  );
}
