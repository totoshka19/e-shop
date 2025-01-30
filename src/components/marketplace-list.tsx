import { Link } from 'react-router-dom';
import { BaseProduct } from '../types/product';
import { AppRoute } from '../conts';

type MarketplaceListProps = {
  context: 'productPage' | 'productCard';
  product: BaseProduct;
};

function MarketplaceList({ context, product }: MarketplaceListProps) {
  const formattedPrice = product.price ? `${Math.round(product.price)}р` : 'Цена не указана';

  if (context === 'productPage') {
    return (
      <ul className="marketplace__list">
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/wb-icon.svg" alt="Купить на Wildberries"/>
            Купить - {formattedPrice}
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/ozon-icon.svg" alt="Купить на Ozon"/>
            Купить - {formattedPrice}
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/yamarket-icon.svg" alt="Купить на Яндекс Маркете"/>
            Купить - {formattedPrice}
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/avito-icon.svg" alt="Купить на Avito"/>
            Купить - {formattedPrice}
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/enote-icon.svg" alt="Купить в Enote Shope"/>
            Купить - {formattedPrice}
          </a>
        </li>
        <li className="marketplace__item order-btn">
          <Link to={AppRoute.Order}>Оформить заказ</Link>
        </li>
      </ul>
    );
  }

  if (context === 'productCard') {
    return (
      <ul className="marketplace__list">
        <li className="marketplace__item">
          <Link className="marketplace__item-link" to={`/product/${product.id}`}>
            <img src="/images/enote-icon.svg" alt="Купить в Enote Shope" />
          </Link>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/yamarket-icon.svg" alt="Купить на Яндекс Маркете" />
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/wb-icon.svg" alt="Купить на Wildberries" />
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/avito-icon.svg" alt="Купить на Avito" />
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/ozon-icon.svg" alt="Купить на Ozon" />
          </a>
        </li>
      </ul>
    );
  }

  return null;
}

export default MarketplaceList;
