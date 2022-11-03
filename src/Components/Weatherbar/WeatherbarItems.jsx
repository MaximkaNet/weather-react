import { createContext, useEffect, useState } from 'react';
import './Weatherbar.css';
import $ from 'jquery';

export const WeatherbarContext = createContext(null);

const WeatherbarItems = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(0);
  useEffect(() => {
    const scrollX = () => {
      let itemNumber = 0;
      const items = $('.weatherbarItems').find('.weatherbarItem');
      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains('weatherbarItem_active')) {
          itemNumber = i;
          break;
        }
      }
      $('.weatherbarItems').animate({
        scrollLeft: `${itemNumber * (180 + 30)}px`
      }, 200);
    }
    return () => scrollX();
  }, [currentItem])
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