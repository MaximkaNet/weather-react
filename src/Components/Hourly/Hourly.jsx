import './Hourly.css';
import time from '../../img/hourly/clock.png';
import humidity from '../../img/hourly/humidity.png';
import temperature from '../../img/hourly/temperature.png';
import rain from '../../img/hourly/water.png';
import wind from '../../img/hourly/wind.png';
import HourlyItem from '../HourlyItem/HourlyItem';
import { useEffect } from 'react';
import { handleHourly } from '../../utils/handlers';

const Hourly = ({ hourly }) => {
  const colums = [
    {
      img: time
    },
    {
      img: temperature
    },
    {
      img: rain
    },
    {
      img: humidity
    },
    {
      img: wind
    }
  ]
  useEffect(() => {
    handleHourly()
  })
  return (
    <>
      <div className="weather_hourly">
        {
          hourly != null &&
          hourly.map((i, key) => {
            if (key % 2 === 1)
              return <HourlyItem key={key} hourWeather={i} />
          })
        }
      </div>
      {/* <div className="weather_hourly">
        <div className="hourly_head">
          {
            colums.map((colum, index) => <img key={index} src={colum.img} alt="Hourly img" className='hourly_head_img' />)
          }
        </div>
        <div className="hourly_items">
          {
            hourly != null &&
            hourly.map((i, key) => {
              if (key % 2 === 1)
                return <HourlyItem key={key} hourWeather={i} />
            })
          }
        </div>
      </div> */}
    </>
  )
}
export default Hourly;