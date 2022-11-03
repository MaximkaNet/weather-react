import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Menu.css';
import { menuItems } from '../../menuItems';

const Menu = () => {
  const [isBurger, setIsBurger] = useState(false);
  const [isActive, setActive] = useState(false);

  const open = async () => {
    await setActive(true);
    $('.overlay').fadeIn(50, () => { $('.menu').addClass('open') })
  }

  const close = () => {
    $('.overlay').fadeOut('fast', () => setActive(false));
  }

  let width = window.innerWidth;
  if (width < 768 && !isBurger) {
    setIsBurger(true);
  }
  else if (width >= 768 && isBurger) {
    setIsBurger(false);
  }
  window.addEventListener('resize', (event) => {
    width = window.innerWidth;
    if (width < 768 && !isBurger) {
      setIsBurger(true);
    }
    else if (width >= 768 && isBurger) {
      setIsBurger(false);
    }
  })
  useEffect(() => { /*$('.overlay').fadeIn(50, () => { $('.menu').addClass('open') })*/ }, [isActive]);
  return isBurger
    ?
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
    :
    <>
      <div className="menuList">
        <div className="menuListItems">
          {menuItems.map((i, index) => <Link key={index} to={i.to} className="menuListItem" onClick={close}>{i.name}</Link>)}
        </div>
      </div>
    </>
}
export default Menu;