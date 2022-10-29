import { createContext, useState } from 'react';
import './Weatherbar.css';

export const WeatherbarContext = createContext(null);

const WeatherbarItems = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(0);
  return <div className="weatherbarItems">
    <WeatherbarContext.Provider value={{
      current: currentItem,
      setCurrent: setCurrentItem
    }}>
      {children}
    </WeatherbarContext.Provider>
  </div>
}
export default WeatherbarItems;