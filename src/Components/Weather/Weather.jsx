import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

// components
import Weatherbar from "../Weatherbar/Weatherbar";
import WeatherbarItem from "../WeatherbarItem/WeatherbarItem";
import WeatherbarItems from "../Weatherbar/WeatherbarItems";

// utils
import { floorValue, getDailyBy, getHourlyBy } from "../../utils/data_utils";
import { parseToDaily, parseToHourly } from "../../utils/parsers";

//styles
import './Weather.css';
import WeatherContent from "../WeatherContent/WeatherContent";

import { useParams } from "react-router-dom";
import { getPlaces } from "../../services/placeService";
import { Context } from "../../App";
import { getWeatherJSON } from "../../services/weatherResponseService";
import Loader from "../Loader/Loader";
import { handleHourly } from "../../utils/handlers";

export const WeatherContext = createContext(null);

const getCurrentPlaceInfo = async () => {
  const geoplugin = 'http://www.geoplugin.net/json.gp';
  let response = await fetch(geoplugin).then(res => res.json());
  const place = {
    name: response.geoplugin_city,
    lat: response.geoplugin_latitude, lon: response.geoplugin_longitude,
    timezone: response.geoplugin_timezone
  }
  return place;
}

const getPlaceInfo = async (placeName, found) => {
  if (placeName === undefined && found == null) {
    return await getCurrentPlaceInfo();
  }

  if (found == null) {
    let res = await getPlaces(placeName);
    return res ? res[0] : {
      error: true,
      reason: 'Not found'
    };
  }
  return found;
}

const Weather = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const { choice } = useParams();

  const { found } = useContext(Context);
  const { search } = useContext(Context);

  const [placeInfo, setPlaceInfo] = useState(null);


  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(null);

  const [isLoaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (choice != undefined)
      search.setSearchValue(choice.replace('-', ' '));
  })

  // get data from https://open-meteo.com/
  const getForecast = async () => {
    const response = await getWeatherJSON(placeInfo.lat, placeInfo.lon, placeInfo.timezone);

    const dailyTmp = parseToDaily(response);
    const hourlyTmp = parseToHourly(response);

    setDaily(dailyTmp);
    setHourly(hourlyTmp);

    setCurrentSlide({
      details: getDailyBy(dailyTmp, currentDate),
      hourly: getHourlyBy(hourlyTmp, currentDate)
    })
    setLoaded(true);
  }

  const changeSlide = async (time) => {
    await setCurrentSlide({
      details: getDailyBy(daily, time),
      hourly: getHourlyBy(hourly, time)
    })
    handleHourly()
  }

  //set place info
  useEffect(() => {
    (async () => {
      if (found)
        setPlaceInfo(await getPlaceInfo(choice, found))
      setPlaceInfo(await getPlaceInfo(choice))
    })()
  }, [choice, found])

  // loading forecast
  useEffect(() => {
    if (!isLoaded && placeInfo)
      getForecast();
  }, [isLoaded, placeInfo])


  if (placeInfo?.error)
    return (
      <div className="weather_error">
        <div className="reason">{placeInfo.reason}</div>
      </div>
    )

  return (<>
    {
      !isLoaded
        ?
        <div style={{
          width: '100vw',
          textAlign: 'center',
          color: '#fff'
        }}>
          <Loader />
        </div>
        :
        <div className="container">
          <div className="weather">
            <WeatherContext.Provider value={{
              placeName: placeInfo.name || placeInfo.state,
              current: currentSlide,
              changeSlide: changeSlide
            }}>
              <Weatherbar>
                <WeatherbarItems>
                  {
                    daily.map(({
                      time,
                      weathercode,
                      temperature_min,
                      temperature_max }, index) => <WeatherbarItem
                        key={index}
                        item={index}
                        min={floorValue(temperature_min)}
                        max={floorValue(temperature_max)}
                        time={time}
                        weathercode={weathercode}
                      />
                    )
                  }
                </WeatherbarItems>
              </Weatherbar>
              {
                currentSlide &&
                <WeatherContent />
              }
            </WeatherContext.Provider>
          </div>
        </div >
    }
  </>
  )
}
export default Weather;