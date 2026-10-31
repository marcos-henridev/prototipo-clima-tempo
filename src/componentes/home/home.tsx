import type { FormEvent, ReactNode } from "react";
import { Button, Input, Text } from "@/componentes/ui";
import styles from "./home.module.css";

interface HomeProps {
  onBuscar: (cidade: string) => void;
  carregando?: boolean;
  /** Área de resultado exibida abaixo da busca (ex.: ClimaCard). */
  children?: ReactNode;
}

export default function Home({ onBuscar, carregando = false, children }: HomeProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cidade = new FormData(e.currentTarget).get("cidade");
    onBuscar(String(cidade ?? ""));
  }

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

      <form role="search" onSubmit={handleSubmit}>
        <Input
          id="city-search"
          name="cidade"
          label="Buscar cidade"
          hideLabel
          type="search"
          placeholder="Digite uma cidade"
          autoComplete="off"
          action={
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              aria-label="Pesquisar cidade"
              disabled={carregando}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              <svg>
            </Button>
          }
        />
      </form>

      {children && <div className={styles.resultado}>{children}</div>}
    </section>
  );
}
