import { Button, Card, Input, Text } from "@/componentes/ui";
import styles from "./home.module.css";

export default function Home() {
  return (
    <section className={styles.home} aria-labelledby="home-title">
      <header className={styles.header}>
        <Text variant="eyebrow">Previsão do tempo</Text>
        <Text variant="title" as="h1" id="home-title" className={styles.title}>
          Como está o clima?
        </Text>
        <Text className={styles.intro}>
          Pesquise uma cidade e confira as condições atuais.
        </Text>
      </header>

      <div role="search">
        <Input
          id="city-search"
          label="Buscar cidade"
          hideLabel
          type="search"
          placeholder="Digite uma cidade"
          autoComplete="off"
          action={
            <Button size="icon" aria-label="Pesquisar cidade">
              <span aria-hidden="true">→</span>
            </Button>
          }
        />
      </div>

      <Card as="article" className={styles.weatherCard} aria-label="Clima atual" />
    </section>
  );
}
