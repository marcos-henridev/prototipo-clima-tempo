import Home from "@/componentes/home/home";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.camera} aria-hidden="true"></div>
      <main className={styles.main}>
        <Home />
      </main>
    </div>
  );
}
