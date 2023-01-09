import { ReactNode } from "react";

import styles from "./styles.module.css";

interface IContainerProps {
  children: ReactNode;
}

export function Container({ children }: IContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
