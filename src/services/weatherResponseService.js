export const API_HOST = "https://api.open-meteo.com/v1/forecast?";

export const hourlyProperties = [
  'temperature_2m',
  'relativehumidity_2m',
  'rain',
  'weathercode',
  'windspeed_10m',
  'winddirection_10m'
];
export const dailyProperties = [
  'weathercode',
  'temperature_2m_max',
  'temperature_2m_min',
  'sunrise',
  'sunset'
];

export const getWeatherJSON = async (lat, lon, timezone) => {
  return await fetch(`${API_HOST}latitude=${lat}&longitude=${lon}&hourly=${hourlyProperties.toString()}&daily=${dailyProperties}&timezone=${timezone}`).then(response => response.json());
}