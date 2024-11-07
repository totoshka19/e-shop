import { BaseProduct } from '../types/product';

type ProductCardProps = {
  product: BaseProduct;
};

/*!TODO доделать ссылки на маркетплейсы*/

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <img src={product.previewImg} alt={product.name} />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
      </div>
      <ul className="product-card__marketplace">
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/enote-icon.svg" alt="Купить в Enote Shope"/>
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/yamarket-icon.svg" alt="Купить на Яндекс Маркете"/>
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/wb-icon.svg" alt="Купить на Wildberries"/>
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/avito-icon.svg" alt="Купить на Avito"/>
          </a>
        </li>
        <li className="marketplace__item">
          <a className="marketplace__item-link" href="">
            <img src="/images/ozon-icon.svg" alt="Купить на Ozon"/>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProductCard;
