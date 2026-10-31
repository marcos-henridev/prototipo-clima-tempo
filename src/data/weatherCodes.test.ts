import { TEMPO_DESCONHECIDO } from "@/constants/tempos";
import { descreverTempo } from "./weatherCodes";

describe("descreverTempo", () => {
  it.each([
    [0, "Céu limpo", "☀️"],
    [3, "Nublado", "☁️"],
    [63, "Chuva", "🌧️"],
    [95, "Trovoada", "⛈️"],
  ])("código %i → %s", (codigo, descricao, icone) => {
    expect(descreverTempo(codigo)).toEqual({ descricao, icone });
  });

  it("mostra lua para céu limpo à noite", () => {
    expect(descreverTempo(0, false).icone).toBe("🌙");
    expect(descreverTempo(1, false).icone).toBe("🌙");
  });

  it("não troca o ícone de outras condições à noite", () => {
    expect(descreverTempo(63, false).icone).toBe("🌧️");
  });

  it("devolve o valor padrão para código desconhecido", () => {
    expect(descreverTempo(1234)).toEqual(TEMPO_DESCONHECIDO);
  });
});
