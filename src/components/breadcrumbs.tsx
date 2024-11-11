import { Link } from 'react-router-dom';
import { AppRoute } from '../conts';

function Breadcrumbs() {
  return (
    <section className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
              Главная
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
              Электроника
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
              Комплектующие
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Breadcrumbs;
