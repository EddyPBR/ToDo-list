import styles from "./styles.module.css";

interface IResumeProps {
  withDivider: boolean;
}

export function Resume({ withDivider = false }: IResumeProps) {
  return (
    <>
      <header className={styles.resume}>
        <strong>
          Tarefas criadas
          <span>0</span>
        </strong>
        <strong>
          Concluídas
          <span>0</span>
        </strong>
      </header>

      {withDivider && <div className={styles.divider} />}
    </>
  );
}
