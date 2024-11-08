import { Link } from 'react-router-dom';
import { AppRoute } from '../conts';

type LogoProps = {
  className: string;
};

function Logo({ className = '' }: LogoProps) {
  return (
    <Link className={`${className} logo`} to={AppRoute.Catalog} aria-label="Переход на главную">
      <img className="logo__img" src="/images/logo.svg" alt="Логотип E-Shop" width="40" height="40" />
      <span className="logo__title">E-shop</span>
    </Link>
  );
}

export default Logo;
