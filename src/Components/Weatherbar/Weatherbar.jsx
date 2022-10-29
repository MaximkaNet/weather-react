import { useEffect, useState } from 'react';
import $ from 'jquery';
import './Weatherbar.css';
const Weatherbar = ({ children }) => {
  const [hintIsActive, setHintIsActive] = useState(false);

  const showHint = () => setHintIsActive(true);
  const hideHint = () => $('.hint').fadeOut('fast', () => setHintIsActive(false));

  useEffect(() => { if (hintIsActive) $('.hint').fadeIn('fast') }, [hintIsActive]);

  return (
    <div
      className="weatherbar"
      onMouseEnter={showHint}
      onMouseLeave={hideHint}
    >
      {children}
      {hintIsActive &&
        <div className="hint" style={{ display: 'none' }}>Shift + Scroll</div>
      }
    </div>
  )
}
export default Weatherbar;