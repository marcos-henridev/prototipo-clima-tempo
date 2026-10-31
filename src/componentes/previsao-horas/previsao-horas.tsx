import { Card, Text } from "@/componentes/ui";
import type { PrevisaoHora } from "@/data/hookcustumer";
import { descreverTempo } from "@/data/weatherCodes";
import styles from "./previsao-horas.module.css";

interface PrevisaoHorasProps {
  horas: PrevisaoHora[];
}

export default function PrevisaoHoras({ horas }: PrevisaoHorasProps) {
  if (horas.length === 0) return null;

  return (
    <Card as="section" aria-labelledby="previsao-horas-titulo">
      <Text variant="eyebrow" as="h2" id="previsao-horas-titulo">
        Próximas horas
      </Text>
      <ol className={styles.lista}>
        {horas.map((item, i) => {
          const { descricao, icone } = descreverTempo(item.codigo, item.is_day);
          return (
            <li key={item.hora} className={styles.hora}>
              <Text variant="caption">{i === 0 ? "Agora" : item.hora}</Text>
              <span className={styles.icone} role="img" aria-label={descricao}>
                {icone}
              </span>
              <strong className={styles.temperatura}>
                {Math.round(item.temperatura)}°
              </strong>
              {item.chuva !== null && (
                <span
                  className={styles.chuva}
                  aria-label={`Chuva: ${item.chuva}%`}
                >
                  💧 {item.chuva}%
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
