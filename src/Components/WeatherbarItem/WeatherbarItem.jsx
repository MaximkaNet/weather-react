import { getStatusImg } from '../../utils/img_utils';
import { useDateCoverter, useTemperatureSign, useDayName } from '../../utils/data_utils';
import './WeatherbarItem.css';
import { useContext } from 'react';
import { WeatherbarContext } from '../Weatherbar/WeatherbarItems';
import { WeatherContext } from '../Weather/Weather';

const WeatherbarItem = ({ time, weathercode, min, max, item }) => {
  const { current, setCurrent } = useContext(WeatherbarContext);
  const { changeSlide } = useContext(WeatherContext);

  return (
    <div className={current === item ? 'weatherbarItem active' : 'weatherbarItem'} onClick={() => { setCurrent(item); changeSlide(time); }}>
      <div className="weatherbarItem_container" style={{ justifyContent: 'space-between' }}>
        <div className="weatherbarItem_container" style={{ flexDirection: 'column' }}>
          <span className="weatherbarItem_date">{useDateCoverter(time, 'en')}</span>
          <span className="weatherbarItem_additionalInfo">{useDayName(time)}</span>
        </div>
        <img src={getStatusImg(weathercode)} alt="weatherState" className="weatherbarItem_weatherState" />
      </div>
      <div className="weatherbarItem_container" style={{ marginTop: '3px' }}>
        <span className="weatherbarItem_max">{useTemperatureSign(max)}°</span>
        <span className="weatherbarItem_max" style={{ margin: '0 1px' }}>/</span>
        <span className="weatherbarItem_min">{useTemperatureSign(min)}°</span>
      </div>
    </div >
  )
}
export default WeatherbarItem;