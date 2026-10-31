export interface Tempo {
  descricao: string;
  icone: string;
}

// Códigos WMO usados pela Open-Meteo no campo weather_code
export const TEMPOS: Record<number, Tempo> = {
  0: { descricao: "Céu limpo", icone: "☀️" },
  1: { descricao: "Predominantemente limpo", icone: "🌤️" },
  2: { descricao: "Parcialmente nublado", icone: "⛅" },
  3: { descricao: "Nublado", icone: "☁️" },
  45: { descricao: "Neblina", icone: "🌫️" },
  48: { descricao: "Neblina com geada", icone: "🌫️" },
  51: { descricao: "Garoa fraca", icone: "🌦️" },
  53: { descricao: "Garoa", icone: "🌦️" },
  55: { descricao: "Garoa forte", icone: "🌦️" },
  56: { descricao: "Garoa congelante", icone: "🌧️" },
  57: { descricao: "Garoa congelante forte", icone: "🌧️" },
  61: { descricao: "Chuva fraca", icone: "🌧️" },
  63: { descricao: "Chuva", icone: "🌧️" },
  65: { descricao: "Chuva forte", icone: "🌧️" },
  66: { descricao: "Chuva congelante", icone: "🌧️" },
  67: { descricao: "Chuva congelante forte", icone: "🌧️" },
  71: { descricao: "Neve fraca", icone: "🌨️" },
  73: { descricao: "Neve", icone: "🌨️" },
  75: { descricao: "Neve forte", icone: "❄️" },
  77: { descricao: "Grãos de neve", icone: "❄️" },
  80: { descricao: "Pancadas de chuva fracas", icone: "🌦️" },
  81: { descricao: "Pancadas de chuva", icone: "🌧️" },
  82: { descricao: "Pancadas de chuva fortes", icone: "⛈️" },
  85: { descricao: "Pancadas de neve", icone: "🌨️" },
  86: { descricao: "Pancadas de neve fortes", icone: "🌨️" },
  95: { descricao: "Trovoada", icone: "⛈️" },
  96: { descricao: "Trovoada com granizo", icone: "⛈️" },
  99: { descricao: "Trovoada com granizo forte", icone: "⛈️" },
};

export const TEMPO_DESCONHECIDO: Tempo = {
  descricao: "Condição desconhecida",
  icone: "🌡️",
};
