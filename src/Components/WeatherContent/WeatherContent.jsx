import { useContext } from 'react';
import { getStatusImg, getStatusStr } from '../../utils/img_utils';
import Hourly from '../Hourly/Hourly';
import { WeatherContext } from '../Weather/Weather';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import './WeatherContent.css';

const parseDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${parseInt(date.getHours() / 10)}${parseInt(date.getHours() % 10)}:${parseInt(date.getMinutes() / 10)}${parseInt(date.getMinutes() / 10)}`;
}

const WeatherContent = () => {
  const { current, placeInfo } = useContext(WeatherContext);
  return (
    <div className="weather_content">
      <WeatherInfo
        info={{
          place: placeInfo,
          temperature: current.details.temperature_max,
          status: getStatusStr(current.details.weathercode),
          statusImg: getStatusImg(current.details.weathercode),
          additionalInfo: {
            sunrise: parseDate(current.details.sunrise),
            sunset: parseDate(current.details.sunset)
          }
        }}
      />
      <Hourly hourly={current.hourly} />
    </div>
  )
}
export default WeatherContent;