import sun from '../img/weather/sun.png';
import rain from '../img/weather/rain.png';
import rain_heavy from '../img/weather/rain_heavy.png';
import cloud from '../img/weather/cloud.png';
import cloudPartly from '../img/weather/partly_cloudy.png';
import fog from '../img/weather/fog.png';
import drizzle from '../img/weather/drizzle.png';
import freezingDrizzle from '../img/weather/snowflake.png';
import snow from '../img/weather/snow.png';

/*
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/

export const getStatusImg = (weathercode) => {
  switch (weathercode) {
    case 0:
      return sun;
    case 1:
    case 2:
      return cloudPartly;
    case 3:
      return cloud;
    case 45:
    case 48:
      return fog;
    case 51:
    case 53:
    case 55:
      return drizzle;
    case 56:
    case 57:
      return freezingDrizzle;
    case 61:
      return drizzle;
    case 63:
      return rain;
    case 65:
      return rain_heavy;
    case 66:
    case 67:
      return freezingDrizzle;
    case 71:
    case 73:
    case 75:
    case 77:
      return snow;
    case 80:
    case 81:
    case 82:
      return rain;
    case 85:
    case 86:
      return snow;
    default:
      return sun;
  }
}
export const getStatusStr = (weathercode) => {
  switch (weathercode) {
    case 0:
      return 'Clear';
    case 1:
    case 2:
      return 'Partly cloudy';
    case 3:
      return 'Cloudy';
    case 45:
    case 48:
      return 'Fog';
    case 51:
    case 53:
    case 55:
      return 'Drizzle';
    case 56:
    case 57:
      return 'Freezing drizzle';
    case 61:
    case 63:
      return 'Rain';
    case 65:
      return 'Heavy rain';
    case 66:
    case 67:
      return 'Freezing rain';
    case 71:
    case 73:
    case 75:
    case 77:
      return 'Snow';
    case 80:
    case 81:
    case 82:
      return 'Rain showers';
    case 85:
    case 86:
      return 'Snow';
    default:
      return 'Clear';
  }
}