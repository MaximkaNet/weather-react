export const API_HOST = "https://api.open-meteo.com/v1/forecast?";

export class Daily {
  constructor(temperature_min, temperature_max, time, weathercode) {
    this.temperature_min = temperature_min;
    this.temperature_max = temperature_max;
    this.time = time;
    this.weathercode = weathercode;
  }
}

export class Hourly {
  constructor(time, relativehumidity_2m, temperature_2m, rain, weathercode, windspeed_10m, winddirection_10m) {
    this.time = time;
    this.humidity = relativehumidity_2m;
    this.temperature = temperature_2m;
    this.rain = rain;
    this.weathercode = weathercode;
    this.windspeed = windspeed_10m;
    this.winddirection = winddirection_10m;
  }
}

export class Forecast {
  constructor(lat, lon, timezone) {
    this._daily = [];
    this._hourly = [];
    this._lat = lat;
    this._lon = lon;
    this._timezone = timezone;
  }
  async setData() {
    let response = await getResponseJson(this._lat, this._lon, this._timezone);
    //parse daily
    let responseDaily = response.daily;
    for (let i = 0; i < responseDaily.time.length; i++) {
      let max = responseDaily.temperature_2m_max[i];
      let min = responseDaily.temperature_2m_min[i];
      let time = new Date(responseDaily.time[i]);
      time.setHours(0, 0, 0, 0);
      let weathercode = responseDaily.weathercode[i];
      this._daily.push(new Daily(min, max, time, weathercode));
    }

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
      this._hourly.push(new Hourly(time, humidity, temperature, rain, weathercode, windspeed, winddirection));
    }
  }

  getHourly(date) {
    date.setHours(0, 0, 0, 0);
    let result = [];

    this._hourly.forEach(item => {
      if (item.time.getDate() == date.getDate()
        && item.time.getMonth() == date.getMonth()
        && item.time.getFullYear() == date.getFullYear())
        result.push(item);
    })

    return result;
  }
}

export async function getResponseJson(lat, lon, timezone) {
  let responseBody = await fetch(`${API_HOST}latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,rain,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`).then(response => response.json());
  return responseBody;
}