import styles from "./styles.module.css";

import logoSvg from "../../assets/logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoSvg} alt="Logotipo ToDo" width={126} height={48} />
    </header>
  );
}
