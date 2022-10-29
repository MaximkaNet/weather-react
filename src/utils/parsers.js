export const parseToDaily = (response) => {
  const dailyTmp = [];
  //parse daily
  let responseDaily = response.daily;
  for (let i = 0; i < responseDaily.time.length; i++) {
    let max = responseDaily.temperature_2m_max[i];
    let min = responseDaily.temperature_2m_min[i];
    let time = new Date(responseDaily.time[i]);
    time.setHours(0, 0, 0, 0);
    let weathercode = responseDaily.weathercode[i];
    let sunrise = responseDaily.sunrise[i];
    let sunset = responseDaily.sunset[i];

    dailyTmp.push(
      {
        temperature_min: min,
        temperature_max: max,
        time: time,
        weathercode: weathercode,
        sunrise: sunrise,
        sunset: sunset
      }
    )
  }
  return dailyTmp;
}
export const parseToHourly = (response) => {
  const hourlyTmp = [];
  //parse hourly
  let responseHourly = response.hourly;
  for (let i = 0; i < responseHourly.time.length; i++) {
    let time = new Date(responseHourly.time[i]);
    let temperature = responseHourly.temperature_2m[i];
    let rain = responseHourly.rain[i];
    let humidity = responseHourly.relativehumidity_2m[i];
    let weathercode = responseHourly.weathercode[i];
    let windspeed = responseHourly.windspeed_10m[i];
    let winddirection = responseHourly.winddirection_10m[i];

    hourlyTmp.push({ time, humidity, temperature, rain, weathercode, windspeed, winddirection });
  }
  return hourlyTmp;
}