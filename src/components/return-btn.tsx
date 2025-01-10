import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../conts';

type ReturnBtnProps = {
  isVisible: boolean;
};

function ReturnBtn({ isVisible }: ReturnBtnProps) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 720);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <Link
      className={`return-btn ${isMobile && isVisible ? 'visible' : ''}`}
      to={AppRoute.Catalog}
      aria-label="Вернуться назад"
    >
      <img className="return__img" src="/images/carousel-arrow.svg" alt="Вернуться назад" width="30" height="25" />
    </Link>
  );
}

export default ReturnBtn;
