import styles from "./styles.module.css";

interface IResumeProps {
  amount: number;
  completedAmount: number;
  withDivider?: boolean;
}

export function Resume({
  amount,
  completedAmount,
  withDivider = false,
}: IResumeProps) {
  return (
    <>
      <header className={styles.resume}>
        <strong>
          Tarefas criadas
          <span>{amount}</span>
        </strong>
        <strong>
          Concluídas
          <span>
            {completedAmount} de {amount}
          </span>
        </strong>
      </header>

      {withDivider && <div className={styles.divider} />}
    </>
  );
}
