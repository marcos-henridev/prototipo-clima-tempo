import { useEffect, useState } from "react";

export interface Clima {
  local: string;
  temperatura: number;
  is_day: boolean;
  codigo: number;
}

export const useClima = (cidade: string) => {
  const [dados, setDados] = useState<Clima | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const nome = cidade.trim();

  useEffect(() => {
    if (!nome) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function buscar() {
      try {
        setCarregando(true);
        setErro(null);
        const geoParams = new URLSearchParams({
          name: nome,
          count: "1",
          language: "pt",
        });
        const URL = `https://geocoding-api.open-meteo.com/v1/search?${geoParams}`;
        const geoRes = await fetch(URL, { signal });
        if (!geoRes.ok) throw new Error(`Erro: ${geoRes.status}`);
        const result = await geoRes.json();
        if (!result.results?.length) throw new Error("Cidade não encontrada");

        const { latitude, longitude, name, admin1 } = result.results[0];

        const openMeteoParams = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: "temperature_2m,weather_code,is_day",
          timezone: "auto",
        });

        const URL_OPEN = `https://api.open-meteo.com/v1/forecast?${openMeteoParams}`;
        const clima = await fetch(URL_OPEN, { signal });
        if (!clima.ok) throw new Error(`Erro: ${clima.status}`);
        const climaRes = await clima.json();

        setDados({
          temperatura: climaRes.current.temperature_2m,
          local: admin1 ? `${name}, ${admin1}` : name,
          is_day: climaRes.current.is_day === 1,
          codigo: climaRes.current.weather_code,
        });
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setErro((e as Error).message);
        }
      } finally {
        if (!signal.aborted) setCarregando(false);
      }
    }

    buscar();
    return () => controller.abort();
  }, [nome]);

  // cidade vazia: não mostra resultado antigo
  if (!nome) return { dados: null, carregando: false, erro: null };

  return {
    dados,
    carregando,
    erro,
  };
};
