import styles from "./home.module.css";

export default function Home() {
  return (
    <section className={styles.home} aria-labelledby="home-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>PREVISÃO DO TEMPO</p>
        <h1 id="home-title">Como está o clima?</h1>
        <p className={styles.intro}>
          Pesquise uma cidade e confira as condições atuais.
        </p>
      </header>

      <div className={styles.search} role="search">
        <label className={styles.visuallyHidden} htmlFor="city-search">
          Buscar cidade
        </label>
        <input
          id="city-search"
          type="search"
          placeholder="Digite uma cidade"
          autoComplete="off"
        />
        <button type="button" aria-label="Pesquisar cidade">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <article className={styles.weatherCard} aria-label="Clima atual"></article>
    </section>
  );
}
