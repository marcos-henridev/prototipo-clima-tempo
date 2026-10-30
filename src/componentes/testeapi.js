const paramsGeo = new URLSearchParams({
  name: "são paulo",
  language: "pt-BR",
});

const result = await fetch(
  `https://geocoding-api.open-meteo.com/v1/search?${paramsGeo}`,
);
// if (!result.ok) throw new Error(`Erro ${result.status}`);
const dataGeo = await result.json();

// console.log(dataGeo.results[0]);

const {
  latitude,
  longitude,
  name: cidade,
  admin1: estado,
} = dataGeo.results[0];

const params = new URLSearchParams({
  latitude: latitude,
  longitude: longitude,
  current: "temperature_2m_max,temperature_2m_min,weather_code,is_day",
  // hourly: "temperature_2m",
  // daily: "temperature_2m_max,temperature_2m_min",
  timezone: "America/Sao_Paulo",
  forecast_days: 3,
});

const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
if (!res.ok) throw new Error(`Erro ${res.status}`);
const data = await res.json();

console.log(data);

// array, um valor por dia
