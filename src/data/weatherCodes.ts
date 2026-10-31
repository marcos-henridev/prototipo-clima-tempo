import { TEMPOS, TEMPO_DESCONHECIDO, type Tempo } from "@/constants/tempos";

export const descreverTempo = (codigo: number, isDia = true): Tempo => {
  const tempo = TEMPOS[codigo] ?? TEMPO_DESCONHECIDO;
  // céu limpo à noite mostra lua em vez de sol
  if (!isDia && (codigo === 0 || codigo === 1)) return { ...tempo, icone: "🌙" };
  return tempo;
};
