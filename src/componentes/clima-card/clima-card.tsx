import { Card, Text } from "@/componentes/ui";
import type { Clima } from "@/data/hookcustumer";
import { descreverTempo } from "@/data/weatherCodes";
import styles from "./clima-card.module.css";

interface ClimaCardProps {
  dados: Clima | null;
  carregando: boolean;
  erro: string | null;
}

function Conteudo({ dados, carregando, erro }: ClimaCardProps) {
  if (carregando) return <Text>Buscando o clima…</Text>;
  if (erro) return <Text className={styles.erro}>{erro}</Text>;
  if (!dados) return <Text>Pesquise uma cidade para ver o clima.</Text>;

  const { descricao, icone } = descreverTempo(dados.codigo, dados.is_day);

  return (
    <>
      <div className={styles.location}>
        <div>
          <Text variant="eyebrow">Agora</Text>
          <Text variant="subtitle" as="h2" className={styles.local}>
            {dados.local}
          </Text>
          <Text variant="caption" className={styles.periodo}>
            {dados.is_day ? "Dia" : "Noite"}
          </Text>
        </div>
        <span className={styles.icone} aria-hidden="true">
          {icone}
        </span>
      </div>

      <div className={styles.temperatura}>
        <span>{Math.round(dados.temperatura)}°C</span>
        <Text className={styles.descricao}>{descricao}</Text>
      </div>
    </>
  );
}

export default function ClimaCard(props: ClimaCardProps) {
  return (
    <Card
      as="article"
      aria-label="Clima atual"
      aria-live="polite"
      aria-busy={props.carregando}
    >
      <Conteudo {...props} />
    </Card>
  );
}
