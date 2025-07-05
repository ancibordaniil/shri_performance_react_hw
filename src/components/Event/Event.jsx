import { useEffect, useRef } from 'react';

const Event = ({ icon, iconLabel, title, subtitle, slim, onSize }) => {
  const ref = useRef();

  useEffect(() => {
    if (onSize && ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      onSize({ width, height });
    }
  }, [onSize]);

  return (
    <li ref={ref} className={`event ${slim ? 'event_slim' : ''}`}>
      <button className="event__button">
        <span 
          className={`event__icon event__icon_${icon}`} 
          role="img" 
          aria-label={iconLabel}
        ></span>
        <h4 className="event__title">{title}</h4>
        {subtitle && <span className="event__subtitle">{subtitle}</span>}
      </button>
    </li>
  );
};

export default Event;