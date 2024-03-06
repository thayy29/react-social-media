import igniteLogo from "../assets/ignite-logo.svg";

import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <img src={igniteLogo} />
    </div>
  );
}
