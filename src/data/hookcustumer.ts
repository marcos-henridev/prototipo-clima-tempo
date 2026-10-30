import { useEffect, useState } from "react";

interface Clima {
  local: string;
  temperatura: number;
  is_day: boolean;
}

export const useClima = (cidade: string) => {
  const [dados, setDados] = useState<Clima | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>();

  useEffect(() => {
    if (!cidade) return;

    async function buscar() {
      try {
        setCarregando(true);
        setErro(null);
        const geoParams = new URLSearchParams({
          name: cidade,
          count: "1",
          language: "pt",
        });
        const URL = `https://geocoding-api.open-meteo.com/v1/search?${geoParams}`;
        const geoRes = await fetch(URL);
        const result = await geoRes.json();
        if (!result.results.length) throw new Error("Cidade não encontrada");

        const { latitude, longitude, name, admin1 } = result.results[0];

        const openMeteoParams = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: "temperature_2m_max,temperature_2m_min,weather_code,is_day",
          timezone: "auto",
        });

        const URL_OPEN = `https://api.open-meteo.com/v1/forecast?${openMeteoParams}`;
        const clima = await fetch(URL_OPEN);
        const climaRes = await clima.json();
        if (!climaRes.ok) throw new Error(`Error:${climaRes.status}`);

        setDados({
          temperatura: climaRes.current.temperature_2m_max,
          local: `${name}$, ${admin1}`,
          is_day: climaRes.current.is_day === 1,
        });
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setErro((e as Error).message);
        }
      } finally {
        setCarregando(false);
      }
    }

    buscar();
  }, [cidade]);
  return {
    dados,
    carregando,
    erro,
  };
};
