import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Menu.css';

const Menu = () => {
  const [isActive, setActive] = useState(false);
  const menuItems = [{
    name: "Home",
    to: '/'
  }, {
    name: "Weather",
    to: '/weather'
  }];
  const open = () => {
    setActive(true);
  }
  const close = () => {
    $('.overlay').fadeOut('fast', () => setActive(false));
  }
  useEffect(() => { $('.overlay').fadeIn(50, () => { $('.menu').addClass('open') }) }, [isActive]);
  return (
    <>
      <div className="burger" onClick={open}>
        <span className="burger-item"></span>
        <span className="burger-item"></span>
        <span className="burger-item"></span>
      </div>
      {
        isActive
        &&
        <div className="overlay" style={{ display: 'none' }}>
          <div className="menu">
            <div className="close" onClick={close}>
              <span className="closeItem"></span>
              <span className="closeItem"></span>
            </div>
            <div className="menuItems">
              {menuItems.map((i, index) => <Link key={index} to={i.to} className="menuItem" onClick={close}>{i.name}</Link>)}
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Menu;