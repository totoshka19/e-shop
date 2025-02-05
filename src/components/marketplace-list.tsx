import { Link } from 'react-router-dom';
import { BaseProduct } from '../types/product';
import { AppRoute, marketplaceIcons } from '../conts';

type MarketplaceListProps = {
  context: 'productPage' | 'productCard';
  product: BaseProduct;
};

function MarketplaceList({ context, product }: MarketplaceListProps) {
  const formattedPrice = product.price ? `${Math.round(product.price)}р` : 'Цена не указана';

  const renderMarketplaceItems = () => {
    if (!product.marketplaces || !Array.isArray(product.marketplaces)) {
      return null;
    }

    return product.marketplaces.map((marketplace) => {
      const isProductCard = context === 'productCard';
      return (
        <li className="marketplace__item" key={marketplace.name}>
          <a className="marketplace__item-link" href={marketplace.link} target="_blank" rel="noopener noreferrer">
            <img src={marketplaceIcons[marketplace.name]} alt={`Купить на ${marketplace.name.charAt(0).toUpperCase() + marketplace.name.slice(1)}`} />
            {!isProductCard && `Купить - ${Math.round(marketplace.price)}р`}
          </a>
        </li>
      );
    });
  };

  if (context === 'productPage') {
    return (
      <>
        <ul className="marketplace__list">
          {renderMarketplaceItems()}
        </ul>
        <div className="marketplace__list">
          <div className="marketplace__item">
            <a className="marketplace__item-link" href="">
              <img src={marketplaceIcons['enote']} alt="Купить в Enote Shope" />
              Купить - {formattedPrice}
            </a>
          </div>
          <div className="marketplace__item order-btn">
            <Link to={AppRoute.Order}>Оформить заказ</Link>
          </div>
        </div>
      </>

    );
  }

  if (context === 'productCard') {
    return (
      <ul className="marketplace__list">
        <li className="marketplace__item">
          <Link className="marketplace__item-link" to={`/product/${product.id}`}>
            <img src={marketplaceIcons['enote']} alt="Купить в Enote Shope" />
          </Link>
        </li>
        {renderMarketplaceItems()}
      </ul>
    );
  }

  return null;
}

export default MarketplaceList;
