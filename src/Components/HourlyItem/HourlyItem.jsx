import './HourlyItem.css';
import winddirectionImg from '../../img/windarrow.png';
import { floorValue, useTemperatureSign } from '../../utils/data_utils';

const HourlyItem = ({ hourWeather }) => {
  const currentTime = new Date();
  return (
    <li
      className={currentTime > hourWeather.time ? 'hourly_item hourly_item_inactive' : 'hourly_item'}
    >
      <div className="hourly_item_time">{
        `${parseInt(hourWeather.time.getHours() / 10)
        }${parseInt(hourWeather.time.getHours() % 10)
        }:${parseInt(hourWeather.time.getMinutes() / 10)
        }${parseInt(hourWeather.time.getMinutes() % 10)
        }`
      }
      </div>
      <div className="hourly_item_temperature">{`${useTemperatureSign(floorValue(hourWeather.temperature))}°`}
      </div>
      <div className="hourly_item_rain">{`${hourWeather.rain} mm`}</div>
      <div className="hourly_item_humidity">{`${hourWeather.humidity} %`}</div>

      <div className="hourly_item_wind">
        <img src={winddirectionImg} alt="wind direction" className="hourly_item_winddirection" style={{ rotate: `${hourWeather.winddirection}deg` }} />
        <div className="hourly_item_windspeed">{`${hourWeather.windspeed} m/s`}</div>
      </div>
    </li>
  )
}
export default HourlyItem;